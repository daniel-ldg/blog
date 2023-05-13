import CreatePost from "@/components/create/CreatePost";
import { getAllAuthors } from "@/services/author.service";
import { Author } from "@prisma/client";
import { GetServerSideProps } from "next";
import React from "react";
import { authOptions } from "./api/auth/[...nextauth]";
import { getServerSession } from "next-auth";

interface IProps {
	authors: Author[];
}

export const getServerSideProps: GetServerSideProps<IProps> = async context => {
	const { req, res, resolvedUrl } = context;
	const session = await getServerSession(req, res, authOptions);

	if (!session) {
		const params = new URLSearchParams();
		params.append("callbackUrl", resolvedUrl);
		params.append("error", "Unauthorized");
		return { redirect: { permanent: false, destination: `/login?${params.toString()}` } };
	}

	const authors = await getAllAuthors();
	return {
		props: { authors },
	};
};

const CrearPost: React.FC<IProps> = ({ authors }) => {
	return (
		<>
			<CreatePost authors={authors} />
		</>
	);
};

export default CrearPost;
