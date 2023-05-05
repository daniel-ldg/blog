import { SimilarPostsResponse } from "@/pages/api/getSimilar";
import { Card, Grid, Group, Stack, Text, Title, createStyles } from "@mantine/core";
import Image from "next/image";
import Link, { LinkProps } from "next/link";
import React, { useEffect, useState } from "react";

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
			<Grid>
				{posts.map((post, i) => (
					<Grid.Col xs={12} sm={4} key={i}>
						<Link passHref legacyBehavior href={`/post/${post.url}`}>
							<PostCard post={post} />
						</Link>
					</Grid.Col>
				))}
			</Grid>
			<Group noWrap></Group>
		</section>
	);
};

const useStyles = createStyles(theme => ({
	backgroudImage: {
		zIndex: 0,
		objectFit: "cover",
		objectPosition: "center",
	},
	overlay: {
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		backgroundImage: "linear-gradient(180deg, rgba(0, 0, 0, .2) 0%, rgba(0, 0, 0, .9) 90%)",
		zIndex: 1,
	},
	content: {
		position: "relative",
		height: "100%",
		zIndex: 1,
	},
}));

interface IPropsCard extends Partial<LinkProps> {
	post: Flatten<SimilarPostsResponse>;
}

const PostCard = React.forwardRef<HTMLAnchorElement, IPropsCard>(({ href, onClick, post }, ref) => {
	const { classes } = useStyles();

	return (
		<Card
			component='a'
			href={href?.toString()}
			onClick={onClick}
			ref={ref}
			withBorder
			h={{ base: 100, sm: 200 }}
			radius='md'>
			<Image className={classes.backgroudImage} src={post.image.url} alt={post.image.alt} fill />
			<div className={classes.overlay} />
			<Stack className={classes.content} align='flex-start' justify='flex-end' spacing={0}>
				<Title order={5} c={"#FFF"}>
					{post.title}
				</Title>
				<Text c={"#FFF"} fz='xs' fs='italic' fw={500}>
					{post.author.name}
				</Text>
			</Stack>
		</Card>
	);
});

type Flatten<Type> = Type extends Array<infer Item> ? Item : Type;

export default RelatedPosts;
