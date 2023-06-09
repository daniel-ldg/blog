import useViewportWidth from "@/hooks/useViewportWidth";
import { Loader } from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import { SpotlightAction, SpotlightProvider } from "@mantine/spotlight";
import { IconHome, IconSearch, IconSquarePlus, IconUsersGroup } from "@tabler/icons-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { PropsWithChildren, useEffect, useState } from "react";
import SuperJSON from "superjson";
import useSWR from "swr";
import { z } from "zod";

const SearchProvider: React.FC<PropsWithChildren> = ({ children }) => {
	const router = useRouter();
	const [actions, setActions] = useState<SpotlightAction[]>([]);
	const [query, setQuery] = useState("");
	const [debouncedQuery] = useDebouncedValue(query, 200);
	const { status: sessionStatus } = useSession();

	const fercher = (url: string): Promise<SearchResult> =>
		fetch(url)
			.then(r => r.text())
			.then(text => SuperJSON.parse(text))
			.then(json => validation.parse(json));
	const { data: searchResults, isLoading } = useSWR(
		debouncedQuery !== "" ? `/api/search?q=${debouncedQuery}` : null,
		fercher
	);
	const { sm } = useViewportWidth();

	const defaultActions: SpotlightAction[] = [
		{
			title: "Inicio",
			description: "Ir al inicio",
			icon: <IconHome />,
			onTrigger: () => router.push(`/`),
		},
		{
			title: "Autores",
			description: "Ver todos los autores",
			icon: <IconUsersGroup />,
			onTrigger: () => router.push(`/autores`),
		},
	];

	useEffect(() => {
		if (query === "") {
			let onEmptyQueryActions = defaultActions;
			if (sessionStatus === "authenticated") {
				onEmptyQueryActions.push({
					title: "Crear post",
					description: "Crear nuevo post con Open AI",
					icon: <IconSquarePlus />,
					onTrigger: () => router.push(`/crearPost`),
				});
			}
			setActions(onEmptyQueryActions);
			return;
		}
		const newActions: SpotlightAction[] =
			searchResults?.map(result => ({
				title: result.title,
				description: result.highlights
					.at(0)
					?.texts.map(text => text.value)
					.join(""),
				onTrigger: () => {
					router.push(`/post/${result.url}`);
				},
				url: result.url,
			})) || [];
		setActions(newActions);
	}, [query, searchResults, sessionStatus]);

	return (
		<SpotlightProvider
			actions={actions}
			query={query}
			onQueryChange={setQuery}
			searchIcon={<IconSearch size='1.2rem' />}
			searchPlaceholder='Buscar...'
			nothingFoundMessage={isLoading ? <Loader variant='dots' /> : "Sin resultados..."}
			yOffset={sm ? 120 : 20}>
			{children}
		</SpotlightProvider>
	);
};

type SearchResult = z.infer<typeof validation>;

const validation = z.array(
	z.object({
		title: z.string(),
		url: z.string(),
		highlights: z.array(
			z.object({
				texts: z.array(
					z.object({
						value: z.string(),
						type: z.enum(["text", "hit"]),
					})
				),
			})
		),
	})
);

export default SearchProvider;
