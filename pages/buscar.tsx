import PostListLoader from "@/components/posts/PostListsLoader";
import { Badge, Group, Title } from "@mantine/core";
import { GetServerSideProps } from "next";
import { z } from "zod";

interface IProps {
	keyword: string;
}

export const getServerSideProps: GetServerSideProps<IProps> = async ({ query }) => {
	const validation = z
		.object({
			keyword: z.string().nonempty(),
		})
		.safeParse(query);

	if (validation.success) {
		return {
			props: { keyword: validation.data.keyword },
		};
	} else {
		return {
			notFound: true,
		};
	}
};

const Buscar: React.FC<IProps> = ({ keyword }) => {
	return (
		<>
			<Title order={1} mt='xl'>
				Búsqueda
			</Title>
			{keyword && (
				<>
					<Group noWrap mb='xl'>
						<Title order={3}>Keyword</Title>
						<Badge color='dark' variant='outline'>
							{keyword}
						</Badge>
					</Group>
					<PostListLoader filter={{ keyword }} take={3} />
				</>
			)}
		</>
	);
};

export default Buscar;
