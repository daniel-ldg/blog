import { Badge, Flex } from "@mantine/core";

interface IProps {
	keywords: string[];
}

const Keywords: React.FC<IProps> = ({ keywords }) => {
	return (
		<Flex gap='sm' style={{ flexWrap: "wrap", overflow: "hidden", height: "18px" }}>
			{keywords.map((keyword, i) => (
				<Badge key={i} size='sm' color='gray' variant='outline' style={{ height: "18px" }}>
					{keyword}
				</Badge>
			))}
		</Flex>
	);
};

export default Keywords;
