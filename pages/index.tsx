import PostListLoader from "@/components/posts/PostListsLoader";
import { Title } from "@mantine/core";
import Head from "next/head";

const Home: React.FC = () => {
	return (
		<>
			<Head>
				<title>scriniun</title>
			</Head>
			<Title order={1} my='xl'>
				Posts recientes
			</Title>
			<PostListLoader />
		</>
	);
};

export default Home;
