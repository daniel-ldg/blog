import { Avatar, Group, Select, Text } from "@mantine/core";
import { Author } from "@prisma/client";
import { IconUser } from "@tabler/icons-react";
import Image from "next/image";
import { forwardRef } from "react";

interface IProps {
	authors: Author[];
	label: string;
	onSelect: (authorUrl: string) => void;
	disabled?: boolean;
}

const AuthorSelect: React.FC<IProps> = ({ authors, label, onSelect, disabled }) => {
	return (
		<Select
			label={label}
			placeholder='Seleccionar autor'
			itemComponent={SelectItem}
			data={authors.map(author => ({ value: author.url, label: author.name, author }))}
			maxDropdownHeight={200}
			nothingFound='Sin resultados'
			icon={<IconUser size='1rem' />}
			withAsterisk
			onChange={onSelect}
			allowDeselect
			disabled={disabled}
		/>
	);
};

interface ItemProps extends React.ComponentPropsWithoutRef<"div"> {
	author: Author;
}

const SelectItem = forwardRef<HTMLDivElement, ItemProps>(({ author, ...divProps }: ItemProps, ref) => (
	<div ref={ref} {...divProps}>
		<Group noWrap>
			<Avatar radius='xl'>
				<Image src={author.picture} alt={`Fotografía de ${author?.name}`} height={40} width={40} />
			</Avatar>
			<div>
				<Text size='sm'>{author.name}</Text>
				<Text size='xs' opacity={0.65} lineClamp={1}>
					{author.degree}
				</Text>
			</div>
		</Group>
	</div>
));

SelectItem.displayName = "SelectItem";

export default AuthorSelect;
