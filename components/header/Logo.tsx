import { Box, useMantineColorScheme } from "@mantine/core";
import Image from "next/image";
import Link from "next/link";

const Logo = () => {
	const { colorScheme } = useMantineColorScheme();
	const isDark = colorScheme === "dark";
	const logo = isDark ? "/scriniun_logo_light.svg" : "/scriniun_logo.svg";

	return (
		<Link href={"/"} passHref legacyBehavior>
			<Box component='a'>
				<Image
					key={`logo_${isDark ? "dark" : "light"}`}
					src={logo}
					alt='scriniun logo'
					height={18}
					width={85}
					style={{ pointerEvents: "none" }}
				/>
			</Box>
		</Link>
	);
};

export default Logo;
