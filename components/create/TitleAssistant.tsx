import { PostTitleResponse } from "@/pages/api/createPostTitle";
import { Button, Group, Modal, MultiSelect, Skeleton, Stack, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useEffect, useState } from "react";
import useSWR from "swr";

interface IProps {
	isOpen: boolean;
	onClose: () => void;
	onSelect: (title: string) => void;
}

const TitleAssistant: React.FC<IProps> = ({ isOpen, onClose, onSelect }) => {
	const expectedKeywords = 5;
	const expectedTitles = 10;
	const [data, setData] = useState<string[]>([]);
	const [selected, setSelected] = useState<string[]>([]);
	const [confirmed, setConfirmed] = useState<string[]>([]);
	const {
		data: assistantResponse,
		isLoading: isLoadingResponse,
		isValidating: isValidatingResponse,
		mutate,
	} = useSWR(
		confirmed.length !== 0 ? `/api/createPostTitle?keywords=${encodeURIComponent(confirmed.join(","))}` : null,
		fetcher,
		{ revalidateOnFocus: false, revalidateOnReconnect: false, revalidateIfStale: false, errorRetryCount: 0 }
	);

	useEffect(() => {
		// load random initial keywords on multiselect
		if (isOpen) {
			setSelected([]);
			setConfirmed([]);
			setData([]);
			mutate();
		}
	}, [isOpen]);

	const prompt = () => {
		const isSameConfirmedSelected = confirmed.length !== 0 && confirmed.every((keyword, i) => selected.at(i) === keyword);
		if (isSameConfirmedSelected) {
			// trigger swr refresh
			mutate();
		} else {
			// update state (refresh triggers itself)
			setConfirmed([...selected]);
		}
	};

	const isLoading = isLoadingResponse || isValidatingResponse;

	return (
		<Modal
			size='lg'
			closeOnClickOutside={false}
			opened={isOpen}
			onClose={onClose}
			title='Título del post'
			keepMounted={false}
			zIndex={2000}>
			<Stack>
				<MultiSelect
					label='Keywords'
					data={data}
					value={selected}
					onChange={setSelected}
					disabled={isLoading}
					placeholder='Escribe keywords'
					searchable
					creatable
					withAsterisk
					getCreateLabel={query => `+ agregar "${query}"`}
					onCreate={query => {
						setData(current => [...current, query]);
						return query;
					}}
				/>
				<Button disabled={selected.length === 0} loading={isLoading} onClick={prompt}>
					{isLoading ? "Cargando..." : "Sugerir"}
				</Button>
				<div>
					<Text>Keywords sugeridas</Text>
					<Group spacing={5}>
						{Array.from(Array(expectedKeywords).keys())
							.map(i => assistantResponse?.keywords.at(i))
							.map((keyword, i) =>
								isLoading || !keyword ? (
									<Skeleton key={i} height={26} width='24%' animate={isLoading} />
								) : (
									<SingleClickButton
										key={i}
										label={keyword}
										onClick={() => {
											setData(current => [...current, keyword]);
											setSelected(current => [...current, keyword]);
										}}
									/>
								)
							)}
					</Group>
				</div>
				<div>
					<Text>Títulos sugeridos</Text>
					<Group spacing={5}>
						{Array.from(Array(expectedTitles).keys())
							.map(i => assistantResponse?.titles.at(i))
							.map((title, i) =>
								isLoading || !title ? (
									<Skeleton key={i} height={26} width='100%' animate={isLoading} />
								) : (
									<Button
										key={i}
										variant='outline'
										color='gray'
										fullWidth
										compact
										onClick={() => {
											onSelect(title);
											onClose();
										}}>
										{title}
									</Button>
								)
							)}
					</Group>
				</div>
			</Stack>
		</Modal>
	);
};

const SingleClickButton: React.FC<{ onClick: () => void; label: string }> = ({ onClick, label }) => {
	const [clicked, { open: click }] = useDisclosure();
	return (
		<Button
			variant='outline'
			color='gray'
			radius='xl'
			compact
			onClick={() => {
				click();
				onClick();
			}}
			disabled={clicked}>
			{label}
		</Button>
	);
};

const fetcher = (url: string) =>
	fetch(url)
		.then(res => {
			if (!res.ok) {
				throw new Error(`${res.status}`);
			}
			return res;
		})
		.then(res => res.json())
		.then(json => json as PostTitleResponse);

export default TitleAssistant;
