import { Avatar, Card, Group, Skeleton, Spoiler, Text } from "@mantine/core";
import { Author } from "@prisma/client";
import { IconMapPin, IconSchool } from "@tabler/icons-react";
import Image from "next/image";

interface IProps {
	author?: Author;
}

const AuthorCard: React.FC<IProps> = ({ author }) => {
	return (
		<>
			{author && (
				<Card component='section' withBorder radius='md' mt='lg'>
					<Group>
						<Group spacing={5} color='dimmed'>
							<IconMapPin size={18} />
							<Text size='sm'>{author.location}</Text>
						</Group>
						<Group spacing={5} color='dimmed'>
							<IconSchool size={18} />
							<Text size='sm'>{author.degree}</Text>
						</Group>
					</Group>
					<Group>
						<Avatar>
							<Image src={author.picture} alt={`Fotografía de ${author.name}`} width={40} height={40} />
						</Avatar>
						<Text component='h1' size={40} my={0}>
							{author?.name}
						</Text>
					</Group>
					<Spoiler maxHeight={90} hideLabel='Ocultar' showLabel='Ver más'>
						{author.bio?.split(/\r?\n|\r|\n/g).map((paragraph, i) => (
							<p key={i}>{paragraph}</p>
						))}
					</Spoiler>
				</Card>
			)}
			{!author && (
				<Card component='section' withBorder radius='md' mt='lg'>
					<Group mt={8}>
						<Skeleton height={10} width='30%' radius='xl' />
						<Skeleton height={10} width='30%' radius='xl' />
					</Group>
					<Group mt={20}>
						<Skeleton height={40} width={40} radius='md' />
						<Skeleton height={40} width='30%' radius='xs' />
					</Group>
					<Group mt='xl'>
						<Skeleton height={8} width='90%' radius='md' />
						<Skeleton height={8} width='95%' radius='xs' />
						<Skeleton height={8} width='85%' radius='md' />
						<Skeleton height={8} width='50%' radius='xs' mb={16} />
					</Group>
				</Card>
			)}
		</>
	);
};

export default AuthorCard;
