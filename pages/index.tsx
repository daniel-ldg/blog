import PostListLoader from "@/components/posts/PostListsLoader";
import { Title } from "@mantine/core";
import Head from "next/head";

const Home: React.FC = () => {
	const siteName = "scriniun";
	const url = "https://www.scriniun.com";
	const description =
		"Descubre en scriniun.com las últimas tendencias en tecnología y cómo aplicarlas en tu trabajo diario como desarrollador. Nuestros expertos comparten sus conocimientos y experiencia para ayudarte a mejorar tus habilidades en el desarrollo de software.";
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
				<title>{siteName}</title>
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
			</Head>
			<Title order={1} my='xl'>
				Posts recientes
			</Title>
			<PostListLoader />
		</>
	);
};

export default Home;
