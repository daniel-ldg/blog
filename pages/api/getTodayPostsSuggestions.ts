import { OpenAI } from "@/services/api/openai";
import { RedditResponse, getTopPosts } from "@/services/api/reddit";
import { getErrorMessage } from "@/utils/ErrorUtils";
import sendChunkedBody from "@/utils/ServerUtils";
import { randomString } from "@/utils/StringUtils";
import { NextApiHandler } from "next";
import { CreateChatCompletionRequest } from "openai";
import { z } from "zod";

const PROMPT = process.env.PROMPT_GET_SUBREDDIT_SUGGESTIONS;
const SUBREDDITS = ["webdev", "programming", "SoftwareEngineering", "userexperience"];
const MAX_SUGGESTIONS = 5;
const TIME = "day";

interface ApiResponseSuccess {
	ok: true;
	suggestions: { subreddit: string; posts: { title: string; id?: string; suggestion?: string }[] }[];
}

interface ApiResponseError {
	ok: false;
	message: string;
}

export type ApiResponse = ApiResponseSuccess | ApiResponseError;

const handler: NextApiHandler<ApiResponse> = async (req, res) => {
	if (typeof PROMPT !== "string") {
		res.status(500);
		res.json({ ok: false, message: "Config error: PROMPT_GET_SUBREDDIT_SUGGESTIONS" });
		return res.end();
	}

	const { method } = req;

	if (method !== "GET") {
		res.status(405);
		res.setHeader("Allow", ["GET"]);
		res.json({ ok: false, message: `Method ${method} Not Allowed` });
		return res.end();
	}

	// GET Reddit data
	let redditData: Promise<RedditResponse>[] = [];
	const limit = MAX_SUGGESTIONS;
	const t = TIME;

	SUBREDDITS.forEach(subreddit => {
		redditData.push(getTopPosts({ subreddit, limit, t }));
	});

	// fetch each subreddit data and filter out unsuccessful responses
	const assertFullfilled = (
		response: PromiseSettledResult<RedditResponse>
	): response is PromiseFulfilledResult<RedditResponse> =>
		response.status === "fulfilled" && response.value.posts.length !== 0;
	const redditResponses = await Promise.allSettled(redditData).then(responses => responses.filter(assertFullfilled));

	if (redditResponses.length === 0) {
		res.status(500);
		res.json({ ok: false, message: "Reddit data not available" });
		return res.end();
	}

	// send response on a serie of chunks
	res.setHeader("Content-Type", "application/json");
	const { write } = sendChunkedBody(res);

	// extending heroku timeout
	// heroku will terminate a request connection if no data is sent back to the client within 30 seconds
	const extender = setInterval(() => write(" "), 10000);

	const suggestions: ApiResponseSuccess["suggestions"] = [];

	redditResponses.forEach(response => {
		const { subreddit, posts } = response.value;
		suggestions.push({ subreddit, posts: posts.map(p => ({ ...p, id: randomString(3) })) });
	});

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

	let extendedResponse: ApiResponse;

	try {
		// Prompt OpenAI API
		const openAIresponse = await OpenAI.createChatCompletion(completionRequest);
		const json = JSON.parse(openAIresponse.data.choices.at(0)!.message!.content);

		// validate api response
		const responseValidation = z.object({ posts: z.object({ id: z.string(), suggestion: z.string() }).array() });
		const responseObject = responseValidation.parse(json);

		extendedResponse = {
			ok: true,
			suggestions: suggestions.map(s => ({
				...s,
				posts: s.posts.map(p => ({ ...p, ...responseObject.posts.find(r => r.id === p.id) })),
			})),
		};
	} catch (error) {
		const message = "Error: Unexpected AI response";
		extendedResponse = { ok: false, message };
	} finally {
		clearInterval(extender);
	}

	write(JSON.stringify(extendedResponse));
	return res.end();
};

export default handler;
