import { NextApiHandler } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";
import { z } from "zod";

const handler: NextApiHandler = async (req, res) => {
	// Check for session to confirm this is a valid request
	const session = await getServerSession(req, res, authOptions);
	if (!session) {
		return res.status(401).end("Unauthorized");
	}

	const { query } = req;

	const validation = z
		.object({
			url: z.string(),
		})
		.strict()
		.safeParse(query);

	if (!validation.success) {
		return res.status(400).end("Invalid");
	}

	try {
		// this should be the actual path not a rewritten path
		// e.g. for "/blog/[slug]" this should be "/blog/post-1"
		await res.revalidate(validation.data.url);
		const response: RevalidateResponse = { revalidated: true };
		return res.json(response);
	} catch (err) {
		// If there was an error, Next.js will continue
		// to show the last successfully generated page
		return res.status(500).send("Error revalidating");
	}
};

export interface RevalidateResponse {
	revalidated: boolean;
}

export default handler;
