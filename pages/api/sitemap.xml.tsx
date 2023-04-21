import { getAllAuthors } from "@/services/author.service";
import { getAllPostUrl } from "@/services/posts.service";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	const [postsUrl, authors] = await Promise.all([getAllPostUrl(), getAllAuthors()]);
	res.end(
		`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${postsUrl
			.map(url => `<url><loc>${`https://www.scriniun.com/post/${url}`}</loc></url>`)
			.join("")}${authors
			.map(({ url }) => `<url><loc>${`https://www.scriniun.com/autor/${url}`}</loc></url>`)
			.join("")}</urlset>`
	);
};

export default handler;
