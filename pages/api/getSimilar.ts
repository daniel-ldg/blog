import { getPost, similar } from "@/services/posts.service";
import { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";

const PROMPT_KEYWORDS = process.env.PROMPT_KEYWORDS;

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	const { query, method } = req;
	if (method !== "GET") {
		res.setHeader("Allow", ["GET"]);
		res.status(405).end(`Method ${method} Not Allowed`);
		return;
	}

	// Validate body input
	const bodyValidation = z
		.object({
			post: z.string().nonempty(),
		})
		.strict()
		.safeParse(query);

	if (!bodyValidation.success) {
		return res.status(400).end(JSON.stringify(bodyValidation.error));
	}

	const post = await getPost(bodyValidation.data.post);

	if (!post) {
		return res.status(404).end("Post not found");
	}

	const foundPosts = await similar(post);

	return res.status(200).json(foundPosts ? foundPosts : []);
};

export type SimilarPostsResponse = Awaited<ReturnType<typeof similar>>;

export default handler;
