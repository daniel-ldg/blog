import { formatDate } from "@/utils/DateUtils";
import { Avatar, Badge, createStyles, Group } from "@mantine/core";
import { Author } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const useStyles = createStyles(theme => ({
	link: {
		cursor: "pointer",
	},
}));

interface IProps {
	author?: Author;
	date: Date;
}

const PostInfo: React.FC<IProps> = ({ author, date }) => {
	const [formatedDate, setFormatedDate] = useState("...");
	const { classes } = useStyles();

	useEffect(() => {
		setFormatedDate(formatDate(date));
	}, []);

	const avatar = (
		<Avatar size={18} radius='xl'>
			{author?.picture && <Image src={author.picture} alt={`Avatar de ${author.name}`} height={18} width={18} />}
		</Avatar>
	);
	return (
		<Group mt='xs' mb='md'>
			{author && (
				<Link href={`/autor/${author.url}`} passHref legacyBehavior>
					<Badge component='a' color='gray' radius='xl' pl={0} leftSection={avatar} className={classes.link}>
						{author.name}
					</Badge>
				</Link>
			)}
			<Badge color='gray' radius='xl'>
				{formatedDate}
			</Badge>
		</Group>
	);
};

export default PostInfo;
