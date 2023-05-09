import { Box, useMantineColorScheme } from "@mantine/core";
import Image from "next/image";
import Link from "next/link";

const Logo = () => {
	const { colorScheme } = useMantineColorScheme();
	const isDark = colorScheme === "dark";

	return (
		<Link href={"/"} passHref legacyBehavior>
			<Box component='a'>
				<Image src={isDark ? "/scriniun_logo_light.svg" : "/scriniun_logo.svg"} alt='scriniun' height={18} width={85} />
			</Box>
		</Link>
	);
};

export default Logo;
