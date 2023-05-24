import { IconRefresh } from "@tabler/icons-react";
import useSWRMutation from "swr/mutation";
import { Fetcher } from "swr";
import { RevalidateResponse } from "@/pages/api/revalidate";
import ActionButton from "./ActionButton";

interface Props {
	path: string;
	onRevalidation?: () => void;
}

const ActionRevalidate: React.FC<Props> = ({ path, onRevalidation }) => {
	const fetcher: Fetcher<void, string> = url =>
		fetch(`/api/revalidate?url=${url}`)
			.then(res => res.json())
			.then(json => json as RevalidateResponse)
			.then(response => {
				if (onRevalidation && response.revalidated) {
					onRevalidation();
				}
			});
	const { isMutating, trigger, error } = useSWRMutation(path, fetcher);
	return (
		<ActionButton
			loading={isMutating}
			error={!!error}
			icon={<IconRefresh />}
			onClick={trigger}
			label='Regenerar página estática'
		/>
	);
};

export default ActionRevalidate;
