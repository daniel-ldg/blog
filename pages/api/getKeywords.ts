import { getKeywords } from "@/services/posts.service";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	const { method } = req;

	if (method !== "GET") {
		res.setHeader("Allow", ["GET"]);
		res.status(405).end(`Method ${method} Not Allowed`);
		return;
	}

	res.status(200).json(await getKeywords());
	return res.end();
};

export type GetKeywordsType = Awaited<ReturnType<typeof getKeywords>>;

export default handler;
