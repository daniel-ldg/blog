import { useDisclosure } from "@mantine/hooks";
import ActionButton from "../ActionButton";
import { IconSection } from "@tabler/icons-react";
import ManageImagesModal from "./ManageImagesModal";

export interface ManageImagesProps {
	postPath: string;
}

const ActionManageImages: React.FC<ManageImagesProps> = ({ postPath }) => {
	const [opened, { open, close }] = useDisclosure(false);
	return (
		<>
			<ManageImagesModal opened={opened} onClose={close} postUrl={postPath.replace("/post/", "")} />
			<ActionButton loading={opened} error={false} icon={<IconSection />} onClick={open} label='Administrar imágenes' />
		</>
	);
};

export default ActionManageImages;
