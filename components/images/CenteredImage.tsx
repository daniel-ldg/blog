import { Image as PrismaImage } from "@prisma/client";
import Image from "next/image";

interface IProps {
	image: PrismaImage;
	priority?: boolean;
	desiredHeight?: number;
}

const CenteredImage: React.FC<IProps> = ({ image, desiredHeight = 300, priority = false }) => {
	let height = image.height;
	let width = image.width;
	if (height > desiredHeight) {
		height = desiredHeight;
		width = Math.floor((desiredHeight * image.width) / image.height);
	}

	return (
		<Image
			priority={priority}
			src={image.url}
			alt={image.alt}
			height={height}
			width={width}
			style={{ marginLeft: "50%", transform: "translateX(-50%)" }}
		/>
	);
};

export default CenteredImage;
