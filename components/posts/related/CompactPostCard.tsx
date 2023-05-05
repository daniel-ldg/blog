import { SimilarPostsResponse } from "@/pages/api/getSimilar";
import { Flatten } from "@/utils/TypeUtils";
import { Card, Stack, Text, Title, createStyles } from "@mantine/core";
import Image from "next/image";
import { LinkProps } from "next/link";
import React from "react";

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

const CompactPostCard = React.forwardRef<HTMLAnchorElement, IPropsCard>(({ href, onClick, post }, ref) => {
	const { classes } = useStyles();

	return (
		<Card
			component='a'
			href={href?.toString()}
			onClick={onClick}
			ref={ref}
			withBorder
			h={{ base: 125, sm: 200 }}
			radius='md'>
			<Image
				className={classes.backgroudImage}
				src={post.image.url}
				alt={post.image.alt}
				fill
				sizes='(max-width: 768px) 100vw, 33vw'
			/>
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

CompactPostCard.displayName = "CompactPostCard";

export default CompactPostCard;
