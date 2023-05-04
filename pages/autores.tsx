import AuthorsList from "@/components/authors/AuthorsList";
import { getAllAuthors } from "@/services/author.service";
import { Author } from "@prisma/client";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { jsonLdScriptProps } from "react-schemaorg";
import { BreadcrumbList } from "schema-dts";

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
	const siteName = "scriniun";
	const url = "https://www.scriniun.com/autores";
	const description = "Ver todos los autores";
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
				<title>Autores</title>
				<meta name='description' content={description} />
				<meta name='robots' content='follow, index' />
				{/* Facebook Meta Tags */}
				<meta property='og:url' content={url} />
				<meta property='og:type' content='website' />
				<meta property='og:title' content={siteName} />
				<meta property='og:description' content={description} />
				<meta property='og:image' content={cardImage.url} />
				<meta property='og:image:width' content={`${cardImage.width}`} />
				<meta property='og:image:height' content={`${cardImage.height}`} />
				<meta property='og:image:alt' content={cardImage.alt} />
				{/* Twitter Meta Tags */}
				<meta name='twitter:card' content='summary_large_image' />
				<meta property='twitter:domain' content='scriniun.com' />
				<meta property='twitter:url' content={url} />
				<meta name='twitter:title' content={siteName} />
				<meta name='twitter:description' content={description} />
				<meta name='twitter:image' content={cardImage.url} />
				{/* Google JSON-LD */}
				<script
					{...jsonLdScriptProps<BreadcrumbList>({
						"@context": "https://schema.org",
						"@type": "BreadcrumbList",
						itemListElement: [
							{
								"@type": "ListItem",
								position: 1,
								name: "Autores",
								item: "https://www.scriniun.com/autores",
							},
						],
					})}
				/>
			</Head>
			<h1>Autores</h1>
			<AuthorsList authors={authors} />
		</>
	);
};

export default Autores;
