import { ExtendedAuthor } from "@/services/author.service";
import { Box, Text } from "@mantine/core";
import PostListLoader from "../posts/PostListsLoader";
import AuthorCard from "./AuthorCard";

interface IProps {
	author: ExtendedAuthor;
}

const AuthorViewer: React.FC<IProps> = ({ author }) => {
	return (
		<>
			<AuthorCard author={author} />
			<Box my='xl'>
				<Text component='h2' size={20}>{`Lo último de ${author.name}`}</Text>
				<PostListLoader authorUrl={author.url} take={3} />
			</Box>
		</>
	);
};

export default AuthorViewer;
