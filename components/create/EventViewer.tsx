import { SentEvent } from "@/pages/api/createPost";
import { Code, Tabs } from "@mantine/core";
import EventCard from "./EventCard";
import { formatDate } from "@/utils/DateUtils";

interface IProps {
	events: Map<string, SentEvent[]>;
}

const EventViewer: React.FC<IProps> = ({ events }) => {
	return (
		<Tabs defaultValue='notifications'>
			<Tabs.List>
				<Tabs.Tab value='notifications'>Notificaciones</Tabs.Tab>
				<Tabs.Tab value='console'>Consola</Tabs.Tab>
			</Tabs.List>

			<Tabs.Panel value='notifications' pt='md'>
				{Array.from(events)
					.reverse()
					.map(([_, events], i) => (
						<EventCard key={i} events={events} />
					))}
			</Tabs.Panel>
			<Tabs.Panel value='console' style={{ height: "220px", overflow: "scroll" }}>
				<Code block style={{ whiteSpace: "pre-wrap" }}>
					{Array.from(events)
						.map(event => event[1])
						.flat()
						.sort((a, b) => (a.timestamp > b.timestamp ? 1 : 0))
						.map(
							e =>
								`${e.state} ${e.step} (${
									new Date(e.timestamp).toLocaleTimeString() +
									"." +
									new Date(e.timestamp).getMilliseconds().toString().padStart(3, 0)
								})\n${e.message}\n${JSON.stringify(e.metadata)}`
						)
						.join("\n\n")}
				</Code>
			</Tabs.Panel>
		</Tabs>
	);
};

export default EventViewer;
