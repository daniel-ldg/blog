import { getJson } from "serpapi";

const api_key = process.env.SERP_API_KEY;

export interface ImageResult {
	url: string;
	width: number;
	height: number;
	alt: string;
}

export const searchImagesSerpApi = (q: string): Promise<ImageResult[]> => {
	return getJson("google", { api_key, q, safe: "active", tbm: "isch", device: "desktop" }).then(result => {
		const images = result?.images_results;
		if (!Array.isArray(images)) {
			throw new Error("Unexpected SerpAPI response");
		}

		const results: ImageResult[] = images
			.map(image => ({
				url: image.original,
				alt: image.title,
				width: image.original_width,
				height: image.original_height,
			}))
			.filter(i => i.url && i.alt && i.height && i.width);

		if (!results.length) {
			throw new Error("No results");
		}

		return results;
	});
};
