import { GetKeywordsType } from "@/pages/api/getKeywords";
import { ActionIcon, Box, Container, Grid, Group, Stack, Text, Title, createStyles, rem } from "@mantine/core";
import { IconBrandInstagram, IconBrandTwitter, IconBrandYoutube } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import { CSSProperties, useEffect, useState } from "react";
import { TagCloud } from "react-tagcloud";

const useStyles = createStyles(theme => ({
	footer: {
		backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[0],
		borderTop: `${rem(1)} solid ${theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[2]}`,
	},
	afterFooter: {
		borderTop: `${rem(1)} solid ${theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[2]}`,
	},
}));

const FooterLinks: React.FC = () => {
	const { classes } = useStyles();
	const [keywords, setKeywords] = useState<GetKeywordsType>([]);

	useEffect(() => {
		fetch("/api/getKeywords")
			.then(res => res.json())
			.then(json => json as GetKeywordsType)
			.then(data => setKeywords(data));
	}, []);

	return (
		<footer className={classes.footer}>
			<Container size='md'>
				<Grid py='xl' justify='center'>
					<Grid.Col span={10} sm={3} mb='xl'>
						<Box>
							<Link href={"/"} passHref legacyBehavior>
								<Box component='a'>
									<Image src='/scriniun_logo.svg' alt='scriniun' height={18} width={85} />
								</Box>
							</Link>
							<Text size='xs' color='dimmed'>
								Tu puerta al mundo de la tecnología y el desarrollo de software
							</Text>
						</Box>
					</Grid.Col>
					<Grid.Col span={10} sm={9}>
						{keywords.length && (
							<Stack spacing={0}>
								<Title order={6}>En Scriniun encuentras...</Title>
								<TagCloud
									tags={keywords.map(item => ({ value: item.keyword, count: item.count, color: "#868e96" }))}
									minSize={12}
									maxSize={24}
									renderer={linkRenderer}
									randomSeed={12}
								/>
							</Stack>
						)}
					</Grid.Col>
				</Grid>
				<Box className={classes.afterFooter} py='md'>
					<Group position='apart'>
						<Text color='dimmed' size='sm'>
							© {new Date().getFullYear()} Scriniun. All rights reserved.
						</Text>
						<Group spacing={0} noWrap>
							<ActionIcon size='lg' disabled>
								<IconBrandTwitter size='1.05rem' stroke={1.5} />
							</ActionIcon>
							<ActionIcon size='lg' disabled>
								<IconBrandYoutube size='1.05rem' stroke={1.5} />
							</ActionIcon>
							<ActionIcon size='lg' disabled>
								<IconBrandInstagram size='1.05rem' stroke={1.5} />
							</ActionIcon>
						</Group>
					</Group>
				</Box>
			</Container>
		</footer>
	);
};

const linkRenderer: ReactTagCloud.RendererFunction = (tag, size, color) => {
	const { className, style, ...props } = tag.props || {};
	const fontSize = size + "px";
	const key = tag.key || tag.value;
	const styles: CSSProperties = {
		margin: "0px 3px",
		verticalAlign: "middle",
		display: "inline-block",
		textDecoration: "none",
	};
	const tagStyle = { ...styles, color, fontSize, ...style };

	let tagClassName = "tag-cloud-tag";
	if (className) {
		tagClassName += " " + className;
	}

	return (
		<Link
			href={{ pathname: "/buscar", query: { keyword: tag.value } }}
			className={tagClassName}
			style={tagStyle}
			key={key}
			{...props}>
			{tag.value}
		</Link>
	);
};

export default FooterLinks;
