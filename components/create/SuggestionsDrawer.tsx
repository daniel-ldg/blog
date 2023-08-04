import { ApiResponse } from "@/pages/api/getTodayPostsSuggestions";
import { Drawer, LoadingOverlay, Paper, Stack, Tabs, Text } from "@mantine/core";
import { FC, useState } from "react";
import useSWRImmutable from "swr/immutable";
import { Fetcher, SWRConfiguration } from "swr";
import { IconBrandReddit, IconFaceIdError } from "@tabler/icons-react";

const SUGGESTIONS_API_URL = "/api/getTodayPostsSuggestions";

interface IProps {
	isOpen: boolean;
	onClose: () => void;
	onSelect: (title: string) => void;
}

const SuggestionsDrawer: FC<IProps> = ({ isOpen, onClose, onSelect }) => {
	const [activeTab, setActiveTab] = useState<string | null>();

	const fetcher: Fetcher<ApiResponse, string> = url => fetch(url).then(r => r.json());
	const config: SWRConfiguration<ApiResponse> = {
		onSuccess: data => setActiveTab(data.suggestions.at(0)?.subreddit),
	};
	const { data, error, isLoading } = useSWRImmutable(SUGGESTIONS_API_URL, fetcher, config);

	const errorMessage = (
		<Stack align='center'>
			<IconFaceIdError size={100} />
			<Text fz='xl' fw={700}>
				¡Oh, no!
			</Text>
			<Text>Ocurrió un error al cargar los datos</Text>
		</Stack>
	);

	return (
		<Drawer opened={isOpen} onClose={onClose} position='right' size='lg' title='Sugerencias' zIndex={2000}>
			<LoadingOverlay visible={isLoading} overlayBlur={2} />
			{error && errorMessage}
			{data && (
				<Tabs value={activeTab} onTabChange={setActiveTab}>
					<Tabs.List>
						{data.suggestions.map((s, i) => (
							<Tabs.Tab
								key={i}
								value={s.subreddit}
								icon={activeTab !== s.subreddit && <IconBrandReddit size='0.8rem' />}>
								{activeTab === s.subreddit && s.subreddit}
							</Tabs.Tab>
						))}
					</Tabs.List>
					{data.suggestions.map((s, i) => (
						<Tabs.Panel key={i} value={s.subreddit}>
							<Stack mt='md'>
								{s.posts.map((p, k) => (
									<Paper
										key={k}
										shadow='xs'
										withBorder
										p='xs'
										style={{ cursor: "pointer" }}
										onClick={() => {
											onSelect(p.suggestion || "");
											onClose();
										}}>
										<Stack spacing={0}>
											<Text>{p.suggestion}</Text>
											<Text c='dimmed' fz='xs'>
												{p.title}
											</Text>
										</Stack>
									</Paper>
								))}
							</Stack>
						</Tabs.Panel>
					))}
				</Tabs>
			)}
		</Drawer>
	);
};

export default SuggestionsDrawer;
