import { SimilarPostsResponse } from "@/pages/api/getSimilar";
import { Grid, Group, Title } from "@mantine/core";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import CompactPostCard from "./CompactPostCard";

interface IProps {
	postUrl: string;
}

const RelatedPosts: React.FC<IProps> = ({ postUrl }) => {
	const [posts, setPosts] = useState<SimilarPostsResponse>([]);

	useEffect(() => {
		fetch(`/api/getSimilar?post=${postUrl}`)
			.then(res => res.json())
			.then(json => json as SimilarPostsResponse)
			.then(similar => setPosts(similar));
	}, [postUrl]);

	return (
		<section>
			<Title order={4} mb='sm' mt='xl'>
				Te puede interesar
			</Title>
			<Grid pb='lg'>
				{posts.map((post, i) => (
					<Grid.Col xs={12} sm={4} key={i}>
						<Link passHref legacyBehavior href={`/post/${post.url}`}>
							<CompactPostCard post={post} />
						</Link>
					</Grid.Col>
				))}
			</Grid>
			<Group noWrap></Group>
		</section>
	);
};

export default RelatedPosts;
