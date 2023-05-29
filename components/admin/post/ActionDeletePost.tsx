import { useDisclosure } from "@mantine/hooks";
import ActionButton from "../ActionButton";
import { IconTrash } from "@tabler/icons-react";
import ConfirmModal from "../ConfirmModal";
import useSWRMutation from "swr/mutation";
import { Fetcher } from "swr";

export interface Props {
	postPath: string;
}

const ActionDeletePost: React.FC<Props> = ({ postPath }) => {
	const [opened, { open, close }] = useDisclosure(false);
	const postUrl = postPath.replace("/post/", "");
	const { error, isMutating, trigger } = useSWRMutation(postUrl, fetcher);
	const handleDelete = () =>
		trigger().then(res => {
			if (res?.ok) {
				alert("Post eliminado. Regenerá la página para actualizar");
			}
		});
	return (
		<>
			<ConfirmModal
				opened={opened}
				onClose={close}
				onConfirm={handleDelete}
				title='Eliminar Post'
				message='Este post se eliminará permanentemente. Esta acción no se puede deshacer'
				confirm='Eliminar'
				danger
			/>
			<ActionButton
				loading={opened || isMutating}
				error={!!error}
				icon={<IconTrash />}
				onClick={open}
				label='Eliminar post'
			/>
		</>
	);
};

const fetcher: Fetcher<Response, string> = url => {
	const api = "/api/removePost";

	return fetch(api, { method: "DELETE", body: JSON.stringify({ url }) });
};

export default ActionDeletePost;
