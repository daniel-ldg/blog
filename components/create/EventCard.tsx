import { SentEvent } from "@/pages/api/createPost";
import { DefaultMantineColor, Group, Notification, Text } from "@mantine/core";
import { IconCheck, IconX } from "@tabler/icons-react";

interface IProps {
	events: SentEvent[];
}

const EventCard: React.FC<IProps> = ({ events }) => {
	const initialEvent = events.at(0);
	const updateEvent = events.at(1);
	const isLoading = updateEvent === undefined;
	const isUpdateSuccess = updateEvent?.state === "success";
	const icon = isUpdateSuccess ? <IconCheck size='1.2rem' /> : <IconX size='1.2rem' />;
	const color: DefaultMantineColor = isLoading ? "blue" : isUpdateSuccess ? "teal" : "red";
	return (
		<Notification
			mb='xs'
			loading={isLoading}
			icon={icon}
			withCloseButton={false}
			title={initialEvent?.message}
			color={color}>
			<Group position='apart' noWrap>
				<Text lineClamp={1}>{updateEvent?.message}</Text>
				{!isLoading && <Text>{formatDuration(updateEvent.timestamp - (initialEvent?.timestamp || 0))}</Text>}
			</Group>
		</Notification>
	);
};

const formatDuration = (ms: number) => {
	if (ms < 0) ms = -ms;
	const time = {
		dia: Math.floor(ms / 86400000),
		hr: Math.floor(ms / 3600000) % 24,
		min: Math.floor(ms / 60000) % 60,
		seg: Math.floor(ms / 1000) % 60,
		ms: Math.floor(ms) % 1000,
	};
	return (
		Object.entries(time)
			.filter(val => val[1] !== 0)
			.slice(0, 1)
			.map(val => val[1] + val[0])
			.at(0)
			?.toString() || "1ms"
	);
};

export default EventCard;
