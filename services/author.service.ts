import { AuthorFindFirstSchema, AuthorFindManySchema } from "@/prisma/generated/schemas";
import { prismaInstance } from "@/prisma/PrismaInstance";
import { Author, Post, Prisma } from "@prisma/client";

export interface ExtendedAuthor extends Author {
	posts?: Post[];
}

export const getAuthor = async (url: string): Promise<ExtendedAuthor | null> => {
	const args: Prisma.AuthorFindFirstArgs = {
		where: { url },
		select: {
			bio: true,
			degree: true,
			location: true,
			name: true,
			picture: true,
			url: true,
			posts: { select: { title: true, createdAt: true, images: true, keywords: true, url: true } },
		},
	};
	const validation = AuthorFindFirstSchema.safeParse(args);
	if (!validation.success) {
		return null;
	}
	const foundAuthor = await prismaInstance.author.findFirst(validation.data);
	return foundAuthor ? foundAuthor : null;
};

export const getAllAuthors = async () => {
	const args: Prisma.AuthorFindManyArgs = {
		select: {
			bio: true,
			degree: true,
			location: true,
			name: true,
			picture: true,
			url: true,
			_count: { select: { posts: true } },
		},
	};
	return await prismaInstance.author.findMany(args);
};
