import { getPostImages, updatePostImages } from "@/services/posts.service";
import { Image } from "@prisma/client";
import { NextApiHandler } from "next";
import { z } from "zod";

const handler: NextApiHandler = async (req, res) => {
	const { query, body, method } = req;

	let response: ExpectedResponse = [];

	if (method === "GET") {
		const validation = z
			.object({
				post: z.string(),
			})
			.strict()
			.safeParse(query);

		if (!validation.success) {
			return res.status(400).end();
		}
		const { post } = validation.data;
		try {
			response = await getPostImages(post);
		} catch (e) {
			return res.status(404).end();
		}
	} else if (method === "PUT") {
		let validation: { post: string; images: Image[] };

		try {
			validation = bodyValidator.parse(body);
		} catch (e) {
			return res.status(400).end();
		}
		const { post, images } = validation;
		try {
			response = await updatePostImages(post, images);
		} catch (e) {
			return res.status(404).end();
		}
	} else {
		res.setHeader("Allow", ["GET", "PUT"]);
		res.status(405).send(`Method ${method} Not Allowed`);
	}

	res.json(response);
	res.end();
};

const imagesValidator = z.object({ url: z.string(), alt: z.string(), width: z.number(), height: z.number() }).strict().array();
const bodyValidator = z
	.object({
		post: z.string(),
		images: z
			.string()
			.transform((val, ctx) => {
				try {
					const parsedImages = JSON.parse(val);
					return imagesValidator.parse(parsedImages);
				} catch (e) {
					ctx.addIssue({
						code: z.ZodIssueCode.custom,
						message: "invalid images",
					});
					return z.NEVER;
				}
			})
			.or(imagesValidator),
	})
	.strict();

export type ExpectedResponse = Image[];

export default handler;
