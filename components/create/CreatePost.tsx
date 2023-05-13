import { SentEvent } from "@/pages/api/createPost";
import { Button, Code, Input, Stack, Title } from "@mantine/core";
import { EventSourceMessage, fetchEventSource } from "@microsoft/fetch-event-source";
import { Author } from "@prisma/client";
import { IconArticle, IconBrandOpenai } from "@tabler/icons-react";
import { useState } from "react";
import SuperJSON from "superjson";
import AuthorSelect from "../author/AuthorSelect";
import EventViewer from "./EventViewer";
import { useDisclosure } from "@mantine/hooks";
import TitleAssistant from "./TitleAssistant";
import Head from "next/head";

interface IProps {
	authors: Author[];
}

const CreatePost: React.FC<IProps> = ({ authors }) => {
	const [author, setAuthor] = useState<Author | undefined>(undefined);
	const [title, setTitle] = useState<string>("");
	const [isOpenAsistant, { open: openAssistant, close: closeAssistant }] = useDisclosure();
	const [isConnected, setIsConnected] = useState<boolean>(false);
	const [eventsByStep, setEventsByStep] = useState<Map<string, SentEvent[]>>(new Map());
	const handleSelect = (url: string) => setAuthor(authors.find(value => value.url === url));

	const create = async () => {
		await fetchEventSource("/api/createPost", {
			keepalive: true,
			openWhenHidden: true,
			method: "POST",
			body: JSON.stringify({ author: author?.url, ...(title !== "" ? { title } : {}) }),
			onopen: async () => {
				setEventsByStep(new Map());
				setIsConnected(true);
			},
			onclose: async () => setIsConnected(false),
			onerror: () => setIsConnected(false),
			onmessage: async (message: EventSourceMessage) => {
				if (message.event === "") {
					return;
				}
				const newEvent = SuperJSON.parse<SentEvent>(message.data);
				setEventsByStep(prev => {
					const newMap = new Map(prev);
					const prevEvents = prev.get(newEvent.step);
					newMap.set(newEvent.step, [...(prevEvents || []), newEvent]);
					return newMap;
				});
			},
		});
	};

	const assistantButton = (
		<Button
			leftIcon={<IconBrandOpenai size='1.5em' />}
			onClick={openAssistant}
			variant='default'
			compact
			disabled={isConnected}>
			Asistente
		</Button>
	);

	return (
		<>
			<Head>
				<title>Crear post</title>
			</Head>
			<Stack align='stretch' mt='lg'>
				<Title my={0}>Crear post</Title>
				<AuthorSelect
					authors={authors}
					label='Selecciona el autor del post'
					onSelect={handleSelect}
					disabled={isConnected}
				/>
				<Code block style={{ whiteSpace: "pre-wrap" }}>
					{author?.prompt}
				</Code>
				<Input.Wrapper label='Título del post' description='Si se deja vacio se generará uno aleatorio'>
					<Input
						icon={<IconArticle />}
						placeholder='Título del post'
						value={title}
						onChange={e => setTitle(e.target.value)}
						disabled={isConnected}
						rightSection={assistantButton}
						rightSectionWidth={120}
					/>
				</Input.Wrapper>
				<Button disabled={!author} loading={isConnected} onClick={create} fullWidth>
					Crear post
				</Button>
				<EventViewer events={eventsByStep} />
			</Stack>
			<TitleAssistant isOpen={isOpenAsistant} onClose={closeAssistant} onSelect={setTitle} />
		</>
	);
};

export default CreatePost;
