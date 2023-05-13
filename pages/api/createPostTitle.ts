import { OpenAI } from "@/services/api/openai";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { CreateChatCompletionRequest } from "openai";
import { z } from "zod";
import { authOptions } from "./auth/[...nextauth]";

const PROMPT_KEYWORDS = process.env.PROMPT_KEYWORDS;

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	const { query, method } = req;

	const session = await getServerSession(req, res, authOptions);

	if (!session) {
		return res.status(401).end(`Unauthorized`);
	}

	if (method !== "GET") {
		res.setHeader("Allow", ["GET"]);
		res.status(405).end(`Method ${method} Not Allowed`);
		return;
	}

	// Validate body input
	const bodyValidation = z
		.object({
			keywords: z.string().nonempty(),
		})
		.strict()
		.safeParse(query);

	if (!bodyValidation.success) {
		return res.status(400).end(JSON.stringify(bodyValidation.error));
	}

	if (typeof PROMPT_KEYWORDS !== "string") {
		return res.status(500).end("Wrong config: PROMPT_KEYWORDS ");
	}

	// Prompt OpenAI API
	const completionRequest: CreateChatCompletionRequest = {
		model: "gpt-3.5-turbo",
		temperature: 1.1,
		messages: [
			{ role: "system", content: PROMPT_KEYWORDS },
			{ role: "user", content: `Lista de palabras: ${bodyValidation.data.keywords}` },
		],
	};

	// Validate response
	let json;
	try {
		const openAIresponse = await OpenAI.createChatCompletion(completionRequest);
		json = JSON.parse(openAIresponse.data.choices.at(0)!.message!.content);
	} catch (error) {
		res.status(500).json({ error });
		return res.end();
	}

	const responseObject = responseValidation.safeParse(json);
	if (!responseObject.success) {
		res.status(500).json({ error: responseObject.error });
		return res.end();
	}

	res.status(200).json(responseObject.data);
	return res.end();
};

const responseValidation = z.object({
	titles: z.string().array(),
	keywords: z.string().array(),
});

export type PostTitleResponse = z.infer<typeof responseValidation>;

export default handler;
