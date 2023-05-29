import { Button, Group, Modal, Stack, Text, Title } from "@mantine/core";
import { IconAlertTriangle } from "@tabler/icons-react";

interface Props {
	opened: boolean;
	onClose: () => void;
	onConfirm: () => void;
	closeOnConfirm?: boolean;
	title?: string;
	message?: string;
	confirm?: string;
	cancel?: string;
	danger?: boolean;
}

const ConfirmModal: React.FC<Props> = ({
	opened,
	onClose,
	onConfirm,
	closeOnConfirm = true,
	title,
	message = "Confirma esta acción",
	confirm = "Confirmar",
	cancel = "Cancelar",
	danger = false,
}) => {
	const handleConfirm = () => {
		onConfirm();
		if (closeOnConfirm) {
			onClose();
		}
	};
	return (
		<Modal
			opened={opened}
			onClose={onClose}
			withCloseButton={!!title}
			title={title ? <Title order={5}>{title}</Title> : undefined}
			zIndex={2000}
			centered>
			<Stack>
				<Text>{message}</Text>
				<Group position='right'>
					<Button variant='outline' onClick={onClose} compact>
						{cancel}
					</Button>
					{danger && (
						<Button color='red' leftIcon={<IconAlertTriangle />} onClick={handleConfirm} compact>
							{confirm}
						</Button>
					)}
					{!danger && (
						<Button onClick={handleConfirm} compact>
							{confirm}
						</Button>
					)}
				</Group>
			</Stack>
		</Modal>
	);
};

export default ConfirmModal;
