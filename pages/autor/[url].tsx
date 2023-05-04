import AuthorViewer from "@/components/author/AuthorViewer";
import { ExtendedAuthor, getAuthor } from "@/services/author.service";
import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import { ParsedUrlQuery } from "querystring";
import { jsonLdScriptProps } from "react-schemaorg";
import { Person } from "schema-dts";

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
	const url = `https://www.scriniun.com/autor/${author.url}`;
	const authorInfo = {
		firstName: author.name.split(" ").at(0)!,
		lastName: author.name.split(" ").slice(1).join(" "),
		userName: author.url,
	};
	const cardImage = {
		url: `${url}/card.png`,
		width: 1200,
		height: 600,
		alt: "scriniun logo",
	};
	return (
		<>
			<Head>
				{/* HTML Meta Tags */}
				<title>{author.name}</title>
				<meta name='description' content={author.bio!} />
				<meta name='robots' content='follow, index' />
				{/* Facebook Meta Tags */}
				<meta property='og:url' content={url} />
				<meta property='og:type' content='profile' />
				<meta property='og:title' content={author.name} />
				<meta property='og:description' content={author.bio!} />
				<meta property='profile:first_name' content={authorInfo.firstName} />
				<meta property='profile:last_name' content={authorInfo.lastName} />
				<meta property='profile:username' content={authorInfo.userName} />
				<meta property='og:image' content={cardImage.url} />
				<meta property='og:image:width' content={`${cardImage.width}`} />
				<meta property='og:image:height' content={`${cardImage.height}`} />
				<meta property='og:image:alt' content={cardImage.alt} />
				{/* Twitter Meta Tags */}
				<meta name='twitter:card' content='summary_large_image' />
				<meta property='twitter:domain' content='scriniun.com' />
				<meta property='twitter:url' content={url} />
				<meta name='twitter:title' content={author.name} />
				<meta name='twitter:description' content={author.bio!} />
				<meta name='twitter:image' content={cardImage.url} />
				{/* Google JSON-LD */}
				<script
					{...jsonLdScriptProps<Person>({
						"@context": "https://schema.org",
						"@type": "Person",
						name: author.name,
						birthPlace: author.location!,
						colleague: author.degree!,
						image: {
							"@type": "ImageObject",
							url: author.picture,
							height: "200",
							width: "200",
						},
						affiliation: {
							"@type": "Organization",
							name: "scriniun",
							url: "https://www.scriniun.com",
						},
					})}
				/>
			</Head>
			<AuthorViewer author={author} />
		</>
	);
};

export default Autor;
