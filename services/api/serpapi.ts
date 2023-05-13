const apiKey = process.env.SERP_API_KEY;

export interface ImageResult {
	url: string;
	width: number;
	height: number;
	alt: string;
}

export const searchImagesSerpApi = (q: string): Promise<ImageResult[]> => {
	return new Promise(resolve => {
		const SerpApi = require("google-search-results-nodejs");
		const search = new SerpApi.GoogleSearch(apiKey);

		const params = {
			engine: "google",
			q: q,
			safe: "active",
			tbm: "isch",
			device: "desktop",
		};

		search.json(params, (data: { images_results: any[] }) => {
			resolve(
				data.images_results.map((r: any) => ({
					url: r.original,
					alt: r.title,
					width: r.original_width,
					height: r.original_height,
				}))
			);
		});
	});
};
