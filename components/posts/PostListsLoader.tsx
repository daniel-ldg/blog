import { useSWRInfinitePosts } from "@/hooks/usePostFetch";
import { Button, Group } from "@mantine/core";
import React from "react";
import PostsCardList from "./PostsCardList";

interface IProps {
	filter?: { authorUrl: string } | { keyword: string };
	take?: number;
}

const PostListLoader: React.FC<IProps> = ({ filter, take }) => {
	const { data, isLoading, fetchNext, isEndReached } = useSWRInfinitePosts(take, filter);
	return (
		<Group position='center'>
			{data?.map((posts, i) => (
				<PostsCardList key={i} posts={posts} />
			))}
			<Button variant='outline' color='dark' compact onClick={fetchNext} loading={isLoading} disabled={isEndReached}>
				{isLoading ? "Cargando..." : isEndReached ? "No hay más posts" : "Cargar más"}
			</Button>
		</Group>
	);
};

export default PostListLoader;
