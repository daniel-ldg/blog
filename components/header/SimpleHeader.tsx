import { Autocomplete, Box, Group, Header, createStyles, rem } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import icon from "./scriniun-cropped.svg";

const useStyles = createStyles(theme => ({
	header: {
		paddingLeft: theme.spacing.md,
		paddingRight: theme.spacing.md,
	},

	inner: {
		height: rem(56),
		display: "flex",
		justifyContent: "space-between",
		alignItems: "center",
	},

	links: {
		[theme.fn.smallerThan("md")]: {
			display: "none",
		},
	},

	search: {
		[theme.fn.smallerThan("xs")]: {
			display: "none",
		},
	},

	link: {
		display: "block",
		lineHeight: 1,
		padding: `${rem(8)} ${rem(12)}`,
		borderRadius: theme.radius.sm,
		textDecoration: "none",
		color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.colors.gray[7],
		fontSize: theme.fontSizes.sm,
		fontWeight: 500,

		"&:hover": {
			backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[0],
		},
	},
}));

interface IProps {
	links?: { link: string; label: string }[];
}

const defaultLinks = [
	{
		link: "/",
		label: "Inicio",
	},

	{
		link: "/autores",
		label: "Autores",
	},
];

const SimpleHeader: React.FC<IProps> = ({ links = defaultLinks }) => {
	const { classes } = useStyles();

	const items = links.map((link, i) => (
		<Link key={i} href={link.link} className={classes.link}>
			{link.label}
		</Link>
	));

	return (
		<Header height={56} className={classes.header}>
			<div className={classes.inner}>
				<Link href={"/"} passHref legacyBehavior>
					<Box component='a'>
						<Group spacing={5}>
							<Image src={icon} alt='scriniun' height={18} />
						</Group>
					</Box>
				</Link>

				<Group>
					<Group ml={50} spacing={5} className={classes.links}>
						{items}
					</Group>
					{/* todo: implementar busqueda con autocompletar(debounce)*/}
					<Autocomplete
						className={classes.search}
						placeholder='Buscar'
						icon={<IconSearch size='1rem' stroke={1.5} />}
						data={["React", "Angular", "Vue", "Next.js", "Riot.js", "Svelte", "Blitz.js"]}
					/>
				</Group>
			</div>
		</Header>
	);
};

export default SimpleHeader;
