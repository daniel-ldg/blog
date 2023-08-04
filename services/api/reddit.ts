import { z } from "zod";

export const RedditTime = ["hour", "day", "week", "month", "year", "all"] as const;

export interface RedditOptions {
	subreddit: string;
	limit: number;
	t: (typeof RedditTime)[number];
}

export interface RedditResponse {
	subreddit: string;
	posts: { title: string }[];
}

export const getTopPosts: (Options: RedditOptions) => Promise<RedditResponse> = ({ subreddit, limit: limitInt, t }) => {
	const url = new URL(`https://www.reddit.com/r/${subreddit}/top.json`);
	const limit = limitInt.toString();
	const params = { limit, t };
	url.search = new URLSearchParams(params).toString();

	return fetch(url)
		.then(res => res.json())
		.then(json => {
			const schema = z.object({
				data: z.object({
					children: z.array(
						z.object({
							data: z.object({
								subreddit: z.string(),
								title: z.string(),
							}),
						})
					),
				}),
			});
			const validation = schema.safeParse(json);
			if (!validation.success) {
				throw new Error("Unexpected reddit response");
			} else {
				return validation.data.data.children;
			}
		})
		.then(data => ({
			subreddit: data.at(0)!.data.subreddit,
			posts: data.map(({ data: { title } }) => ({ title })),
		}));
};
