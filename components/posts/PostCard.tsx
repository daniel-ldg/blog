import { ExtendedPost } from "@/services/posts.service";
import { formatDate } from "@/utils/DateUtils";
import { Avatar, Badge, Card, createStyles, Flex, Group, Text, Title } from "@mantine/core";
import { LinkProps } from "next/link";
import React from "react";
import CenteredImage from "../images/CenteredImage";

const useStyles = createStyles(theme => ({
	card: {
		backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
		cursor: "pointer",
		marginBottom: theme.spacing.xl,
	},
}));

interface IProps extends Partial<LinkProps> {
	post: ExtendedPost;
}

const PostCard = React.forwardRef<HTMLAnchorElement, IProps>(({ href, onClick, post }, ref) => {
	const { classes } = useStyles();
	const mainImage = post.images.at(0);
	return (
		<Card component='a' href={href?.toString()} onClick={onClick} ref={ref} withBorder radius='md' className={classes.card}>
			<Flex direction='column' gap='sm'>
				<Title order={2} m={0}>
					{post.title}
				</Title>
				<Group noWrap spacing='xs'>
					<Group spacing='xs' noWrap>
						<Avatar size={20} radius='xl' src={post.author?.picture} />
						<Text size='xs'>{post.author?.name}</Text>
					</Group>
					<Text size='xs' color='dimmed'>
						•
					</Text>
					<Text size='xs' color='dimmed'>
						{formatDate(post.createdAt, "medium")}
					</Text>
				</Group>
				{mainImage && <CenteredImage image={mainImage} />}
				<Flex gap='sm' style={{ flexWrap: "wrap", overflow: "hidden", height: "18px" }}>
					{post.keywords.map((keyword, i) => (
						<Badge key={i} size='sm' color='gray' variant='outline' style={{ height: "18px" }}>
							{keyword}
						</Badge>
					))}
				</Flex>
			</Flex>
		</Card>
	);
});

export default PostCard;
