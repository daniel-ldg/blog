import { Box, Card, Flex, Group, Text } from "@mantine/core";
import { Author } from "@prisma/client";
import { IconMapPin, IconSchool } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";

interface IAuthorCount extends Author {
	_count?: { posts?: number };
}

interface IProps {
	authors: IAuthorCount[];
}

const AuthorsList: React.FC<IProps> = ({ authors }) => {
	return (
		<Box w='100%'>
			{authors.map((author, i) => (
				<Link key={i} href={`/autor/${author.url}`} passHref legacyBehavior>
					<Card withBorder component='a' mb='lg'>
						<Group>
							<Box>
								<Image src={author.picture} alt={`Fotografía de ${author.name}`} width={60} height={60} />
							</Box>
							<Box>
								<Flex justify='flex-start' align='flex-start' direction='column'>
									<Group>
										<Group spacing={5}>
											<IconMapPin size={18} color='#868e96' />
											<Text size='sm' c='dimmed'>
												{author.location}
											</Text>
										</Group>
										<Group spacing={5}>
											<IconSchool size={18} color='#868e96' />
											<Text size='sm' c='dimmed'>
												{author.degree}
											</Text>
										</Group>
									</Group>
									<Text fz='xl' fw={500}>
										{author.name}
									</Text>
									{author._count?.posts !== undefined && (
										<Text fs='italic' fz='sm' c='dimmed'>{`${author._count.posts} Posts`}</Text>
									)}
								</Flex>
							</Box>
						</Group>
					</Card>
				</Link>
			))}
		</Box>
	);
};

export default AuthorsList;
