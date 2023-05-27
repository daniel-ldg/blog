import { useMantineTheme } from "@mantine/core";
import { Image as PrismaImage } from "@prisma/client";
import Image from "next/image";

interface IProps {
	image: PrismaImage;
	priority?: boolean;
	desiredHeight: number;
	maxWidth?: number;
}

const CenteredImage: React.FC<IProps> = ({ image, desiredHeight, maxWidth, priority = false }) => {
	let height = image.height;
	let width = image.width;
	if (height > desiredHeight) {
		height = desiredHeight;
		width = Math.floor((desiredHeight * image.width) / image.height);
	}
	if (maxWidth && width > maxWidth) {
		width = maxWidth;
		height = Math.floor((maxWidth * image.height) / image.width);
	}

	const { colorScheme } = useMantineTheme();
	const isDarkMode = colorScheme === "dark";
	const almostWhite = "#F9F6EE";

	return (
		<Image
			priority={priority}
			src={image.url}
			alt={image.alt}
			height={height}
			width={width}
			style={{
				marginLeft: "50%",
				transform: "translateX(-50%)",
				background: isDarkMode ? almostWhite : "transparent",
				borderRadius: "5px",
			}}
		/>
	);
};

export default CenteredImage;
