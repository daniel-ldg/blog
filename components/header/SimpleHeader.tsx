import { Box, Group, Header, Input, createStyles, rem } from "@mantine/core";
import { useSpotlight } from "@mantine/spotlight";
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
}));

const SimpleHeader: React.FC = () => {
	const search = useSpotlight();
	const { classes } = useStyles();

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
					<Input
						placeholder='Buscar'
						icon={<IconSearch size='1rem' stroke={1.5} />}
						readOnly
						pointer
						onClick={search.openSpotlight}
						styles={theme => ({
							input: {
								"&:focus-within": {
									borderColor: "#ced4da",
								},
							},
						})}
					/>
				</Group>
			</div>
		</Header>
	);
};

export default SimpleHeader;
