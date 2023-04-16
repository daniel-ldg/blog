import AuthorViewer from "@/components/author/AuthorViewer";
import { ExtendedAuthor, getAuthor } from "@/services/author.service";
import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import { ParsedUrlQuery } from "querystring";

interface IParams extends ParsedUrlQuery {
	url: string;
}

interface IProps {
	author: ExtendedAuthor;
}

export const getStaticPaths: GetStaticPaths = async () => ({ paths: [], fallback: "blocking" });

export const getStaticProps: GetStaticProps<IProps, IParams> = async context => {
	const { url } = context.params!;
	const author = await getAuthor(url);
	if (!author) {
		return { notFound: true };
	}
	return {
		props: { author },
	};
};

const Autor: React.FC<IProps> = ({ author }) => {
	return (
		<>
			<Head>
				<title>{author.name}</title>
			</Head>
			<AuthorViewer author={author} />
		</>
	);
};

export default Autor;
