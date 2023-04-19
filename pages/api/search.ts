import { searchPost } from "@/services/posts.service";
import { NextApiRequest, NextApiResponse } from "next";
import SuperJSON from "superjson";
import { z } from "zod";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	const { query, method } = req;
	if (method !== "GET") {
		res.setHeader("Allow", ["GET"]);
		res.status(405).end(`Method ${method} Not Allowed`);
		return;
	}

	const validation = z
		.object({
			q: z.string(),
		})
		.strict()
		.safeParse(query);

	if (!validation.success) {
		return res.status(400).end("Invalid");
	}

	const { q } = validation.data;

	let foundPosts = await searchPost(q);

	if (foundPosts) {
		res.json(SuperJSON.serialize(foundPosts));
	} else {
		res.json([]);
	}
};

export default handler;
