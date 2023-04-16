import { ExtendedPost } from "@/services/posts.service";
import { Box, Group, Text } from "@mantine/core";
import { IconDatabaseSearch } from "@tabler/icons-react";
import Link from "next/link";
import PostCard from "./PostCard";

interface IProps {
	posts: ExtendedPost[];
}

const PostsCardList: React.FC<IProps> = ({ posts }) => {
	return (
		<Box w='100%'>
			{posts.length === 0 && (
				<Group position='center' my={"xl"}>
					<IconDatabaseSearch />
					<Text>No se encontraron post</Text>
				</Group>
			)}
			{posts.map((post, i) => (
				<Link key={i} passHref legacyBehavior href={`/post/${post.url}`}>
					<PostCard post={post} />
				</Link>
			))}
		</Box>
	);
};

export default PostsCardList;
