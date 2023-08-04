import { OpenAI } from "@/services/api/openai";
import { RedditResponse, getTopPosts } from "@/services/api/reddit";
import { getErrorMessage } from "@/utils/ErrorUtils";
import { randomString } from "@/utils/StringUtils";
import { NextApiHandler } from "next";
import { CreateChatCompletionRequest } from "openai";
import { z } from "zod";

const PROMPT = process.env.PROMPT_GET_SUBREDDIT_SUGGESTIONS;
const SUBREDDITS = ["webdev", "programming", "SoftwareEngineering", "userexperience", "ExperiencedDevs", "coding"];
const MAX_SUGGESTIONS = 5;
const TIME = "day";

export interface ApiResponse {
	suggestions: { subreddit: string; posts: { title: string; id?: string; suggestion?: string }[] }[];
}

interface ErrorResponse {
	message: string;
}

const handler: NextApiHandler<ApiResponse | ErrorResponse> = async (req, res) => {
	if (typeof PROMPT !== "string") {
		return res.status(500).end("Config error: PROMPT_GET_SUBREDDIT_SUGGESTIONS");
	}

	const { method, body } = req;
	if (method !== "GET") {
		res.setHeader("Allow", ["GET"]);
		res.status(405).end(`Method ${method} Not Allowed`);
		return;
	}

	// GET Reddit data
	let redditData: Promise<RedditResponse>[] = [];
	const limit = MAX_SUGGESTIONS;
	const t = TIME;

	SUBREDDITS.forEach(subreddit => {
		redditData.push(getTopPosts({ subreddit, limit, t }));
	});

	const redditResponses = await Promise.allSettled(redditData);

	const suggestions: ApiResponse["suggestions"] = [];

	redditResponses.forEach(response => {
		if (response.status === "fulfilled") {
			const { subreddit, posts } = response.value;
			suggestions.push({ subreddit, posts: posts.map(p => ({ ...p, id: randomString(3) })) });
		}
	});

	// Prompt OpenAI API
	const completionRequest: CreateChatCompletionRequest = {
		model: "gpt-3.5-turbo",
		temperature: 0.5,
		messages: [
			{ role: "system", content: PROMPT },
			{
				role: "user",
				content: `posts: ${suggestions
					.map(s => s.posts.map(p => `(${p.id} '${p.title}')`).join(","))
					.join(",")}`,
			},
		],
	};

	// Validate response
	let json;
	try {
		const openAIresponse = await OpenAI.createChatCompletion(completionRequest);
		json = JSON.parse(openAIresponse.data.choices.at(0)!.message!.content);
	} catch (error) {
		const message = getErrorMessage(error);
		res.status(500).json({ message });
		return res.end();
	}

	const responseValidation = z.object({ posts: z.object({ id: z.string(), suggestion: z.string() }).array() });
	const responseObject = responseValidation.safeParse(json);
	if (!responseObject.success) {
		res.status(500).json({ message: responseObject.error.format()._errors.join(",") });
		return res.end();
	}

	res.status(200).json({
		suggestions: suggestions.map(s => ({
			...s,
			posts: s.posts.map(p => ({ ...p, ...responseObject.data.posts.find(r => r.id === p.id) })),
		})),
	});
	return res.end();
};

export default handler;
