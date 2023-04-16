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

export const getPostsByAuthor = async ({ authorUrl, skip, take }: GetPostByIdArgs) => {
	const validation = z.string().safeParse(authorUrl);

	if (!validation.success) {
		return null;
	}
	return getPosts({ where: { author: { url: validation.data } }, skip, take });
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
