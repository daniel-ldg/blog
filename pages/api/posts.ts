import { getPostsByAuthor, getRecentPosts } from "@/services/posts.service";
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
			author: z.string().optional(),
			skip: z.undefined().or(
				z
					.string()
					.transform(str => parseInt(str))
					.refine(parsed => !isNaN(parsed))
			),
			take: z.undefined().or(
				z
					.string()
					.transform(str => parseInt(str))
					.refine(parsed => !isNaN(parsed))
			),
		})
		.strict()
		.safeParse(query);

	if (!validation.success) {
		return res.status(400).end("Invalid");
	}

	const { author: authorUrl, skip, take } = validation.data;
	let foundPosts;
	if (!authorUrl) {
		foundPosts = await getRecentPosts({ skip, take });
	} else {
		foundPosts = await getPostsByAuthor({ authorUrl, skip, take });
	}
	if (foundPosts) {
		res.json(SuperJSON.serialize(foundPosts));
	} else {
		res.json([]);
	}
};

export default handler;
