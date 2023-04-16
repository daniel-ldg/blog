import AuthorsList from "@/components/authors/AuthorsList";
import { getAllAuthors } from "@/services/author.service";
import { Author } from "@prisma/client";
import { GetServerSideProps } from "next";
import Head from "next/head";

interface IProps {
	authors: Author[];
}

export const getServerSideProps: GetServerSideProps<IProps> = async () => {
	const authors = await getAllAuthors();
	return {
		props: { authors },
	};
};

const Autores: React.FC<IProps> = ({ authors }) => {
	return (
		<>
			<Head>
				<title>Autores</title>
			</Head>
			<h1>Autores</h1>
			<AuthorsList authors={authors} />
		</>
	);
};

export default Autores;
