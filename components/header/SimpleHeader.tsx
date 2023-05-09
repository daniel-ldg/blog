import { ActionIcon, Box, Group, Header, Input, createStyles, rem, useMantineColorScheme } from "@mantine/core";
import { useSpotlight } from "@mantine/spotlight";
import { IconMoonStars, IconSearch, IconSun } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Logo from "./Logo";

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
}));

const SimpleHeader: React.FC = () => {
	const search = useSpotlight();
	const { classes } = useStyles();
	const { colorScheme, toggleColorScheme } = useMantineColorScheme();
	const isDark = colorScheme === "dark";

	return (
		<Header height={56} className={classes.header}>
			<div className={classes.inner}>
				<Logo />
				<Group>
					<Input
						placeholder='Buscar'
						icon={<IconSearch size='1rem' stroke={1.5} />}
						readOnly
						pointer
						onClick={search.openSpotlight}
						w={120}
						styles={theme => ({
							input: {
								"&:focus-within": {
									borderColor: theme.colorScheme === "light" ? "#ced4da" : "#373A40",
								},
							},
						})}
					/>
					<ActionIcon
						variant='outline'
						color={isDark ? "yellow" : "blue"}
						onClick={() => toggleColorScheme()}
						title='Toggle color scheme'>
						{isDark ? <IconSun size='1.1rem' /> : <IconMoonStars size='1.1rem' />}
					</ActionIcon>
				</Group>
			</div>
		</Header>
	);
};

export default SimpleHeader;
