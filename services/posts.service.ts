import { PostFindFirstSchema, PostFindManySchema } from "@/prisma/generated/schemas";
import { prismaInstance } from "@/prisma/PrismaInstance";
import { Author, Post, Prisma } from "@prisma/client";
import { z } from "zod";

export interface ExtendedPost extends Post {
	author?: Author;
}

export const getPost = async (url: string): Promise<ExtendedPost | null> => {
	const args: Prisma.PostFindFirstArgs = {
		where: { url },
		select: {
			author: { select: { name: true, url: true, degree: true, location: true, picture: true } },
			createdAt: true,
			images: true,
			keywords: true,
			quote: true,
			sections: true,
			title: true,
			introduction: true,
			conclusion: true,
			url: true,
		},
	};
	const validation = PostFindFirstSchema.safeParse(args);
	if (!validation.success) {
		return null;
	}
	const foundPost = await prismaInstance.post.findFirst(validation.data);
	return foundPost ? foundPost : null;
};

interface Pagination {
	take?: number;
	skip?: number;
}

interface GetPostsArgs extends Pagination {
	where?: Prisma.PostWhereInput;
}

const getPosts = async ({ where, skip, take }: GetPostsArgs): Promise<ExtendedPost[] | null> => {
	const args: Prisma.PostFindManyArgs = {
		skip,
		take,
		where,
		select: {
			author: { select: { name: true, url: true, picture: true } },
			createdAt: true,
			images: true,
			keywords: true,
			title: true,
			introduction: true,
			url: true,
		},
		orderBy: { createdAt: "desc" },
	};
	const validation = PostFindManySchema.extend({ take: z.number().max(10).default(10) }).safeParse(args);
	if (!validation.success) {
		return null;
	}
	const foundPosts = await prismaInstance.post.findMany(validation.data);
	return foundPosts;
};

export const getRecentPosts = async ({ skip, take }: Pagination) => getPosts({ skip, take });

interface GetPostByIdArgs extends Pagination {
	authorUrl: string;
}

export const getPostsByAuthor = async ({ authorUrl: url, skip, take }: GetPostByIdArgs) => {
	return getPosts({ where: { author: { url } }, skip, take });
};

interface GetPostByKeywordArgs extends Pagination {
	keyword: string;
}

export const getPostsByKeyword = async ({ keyword, skip, take }: GetPostByKeywordArgs) => {
	return getPosts({ where: { keywords: { has: keyword } }, skip, take });
};

export const getAllPostUrl = async (): Promise<string[]> => {
	const args: Prisma.PostFindManyArgs = {
		select: { url: true },
	};
	const validation = PostFindFirstSchema.safeParse(args);
	if (!validation.success) {
		return [];
	}
	const foundPosts = await prismaInstance.post.findMany(validation.data);
	return foundPosts.map(post => post.url);
};

export const searchPost = async (q: string) => {
	const args: Prisma.PostAggregateRawArgs = {
		pipeline: [
			{
				$search: {
					text: {
						query: `"${q}"`,
						path: ["title", "introduction", "sections.title", "sections.paragraphs", "conclusion"],
						fuzzy: {},
					},
					highlight: {
						path: ["introduction", "sections.title", "sections.paragraphs", "conclusion"],
						maxNumPassages: 1,
					},
				},
			},
			{ $limit: 4 },
			{
				$project: {
					_id: 0,
					title: 1,
					url: 1,
					highlights: { $meta: "searchHighlights" },
					score: { $meta: "searchScore" },
				},
			},
		],
	};

	return prismaInstance.post.aggregateRaw(args);
};

interface SimilarSearchParams {
	url: string;
	title: string;
	keywords: string[];
}

export const similar = async ({ url, title, keywords }: SimilarSearchParams) => {
	const args: Prisma.PostAggregateRawArgs = {
		pipeline: [
			{
				$search: {
					compound: {
						should: {
							moreLikeThis: {
								like: { title, keywords },
							},
						},
						mustNot: { text: { query: url, path: "url" } },
					},
				},
			},
			{ $limit: 6 },
			{
				$lookup: {
					from: "Author",
					localField: "authorId",
					foreignField: "_id",
					as: "author",
					pipeline: [
						{
							$project: {
								_id: 0,
								name: 1,
							},
						},
					],
				},
			},
			{
				$project: {
					_id: 0,
					title: 1,
					url: 1,
					keywords: 1,
					author: {
						$arrayElemAt: ["$author", 0],
					},
					image: {
						$arrayElemAt: ["$images", 0],
					},
				},
			},
		],
	};

	return prismaInstance.post.aggregateRaw(args).then(res =>
		z
			.object({
				title: z.string(),
				url: z.string(),
				keywords: z.string().array(),
				author: z.object({ name: z.string() }),
				image: z.object({
					url: z.string(),
					alt: z.string(),
					width: z.number(),
					height: z.number(),
				}),
			})
			.array()
			.parse(res)
	);
};

export const getKeywords = async () => {
	const args: Prisma.PostAggregateRawArgs = {
		pipeline: [
			{ $unwind: { path: "$keywords", preserveNullAndEmptyArrays: false } },
			{ $group: { _id: "$keywords", count: { $sum: 1 } } },
			{ $project: { _id: 0, count: 1, keyword: "$_id" } },
			{ $match: { count: { $gte: 2 } } },
			{ $sort: { count: -1 } },
			{ $limit: 10 },
		],
	};

	return prismaInstance.post
		.aggregateRaw(args)
		.then(res => z.object({ keyword: z.string(), count: z.number() }).array().parse(res));
};
