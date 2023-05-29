import { NextApiHandler } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";
import { z } from "zod";
import { deletePost } from "@/services/posts.service";

const handler: NextApiHandler = async (req, res) => {
	// Check for session to confirm this is a valid request
	const session = await getServerSession(req, res, authOptions);
	if (!session) {
		return res.status(401).end();
	}

	const { body, method } = req;

	if (method !== "DELETE") {
		res.setHeader("Allow", ["DELETE"]);
		res.status(405).end(`Method ${method} Not Allowed`);
		return;
	}

	const validation = z
		.object({
			url: z.string(),
		})
		.strict()
		.safeParse(JSON.parse(body));

	if (!validation.success) {
		return res.status(400).end();
	}

	try {
		const { url } = validation.data;
		const deleted = await deletePost(url);
		res.json({ deleted });
		return res.end();
	} catch (err) {
		return res.status(500).end();
	}
};

export default handler;
