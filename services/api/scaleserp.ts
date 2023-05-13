import { z } from "zod";
import { ImageResult } from "./serpapi";

const apiKey = process.env.SCALE_SERP_API_KEY || "";

export const searchImagesScaleSerp = (q: string): Promise<ImageResult[]> => {
	return new Promise(async (resolve, reject) => {
		const params = new URLSearchParams({
			api_key: apiKey,
			search_type: "images",
			gl: "us",
			q,
		});

		await fetch(`https://api.scaleserp.com/search?${params.toString()}`)
			.then(response => response.json())
			.then(json =>
				z
					.object({
						image_results: z
							.object({ image: z.string(), width: z.number(), height: z.number(), title: z.string() })
							.array(),
					})
					.parse(json)
			)
			.then(data => {
				resolve(
					data.image_results.map(result => ({
						url: result.image,
						alt: result.title,
						height: result.height,
						width: result.width,
					}))
				);
			});
	});
};
