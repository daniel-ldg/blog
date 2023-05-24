import { ActionIcon, Tooltip, useMantineColorScheme } from "@mantine/core";

interface ActionButtonProps {
	label: string;
	icon: JSX.Element;
	error: boolean;
	loading: boolean;
	onClick: () => void;
}

const ActionButton: React.FC<ActionButtonProps> = ({ label, icon, loading, error, onClick }) => {
	const { colorScheme } = useMantineColorScheme();
	const isDarkMode = colorScheme === "dark";
	return (
		<Tooltip label={loading ? "Cargando..." : label} position='left'>
			<div style={{ background: isDarkMode ? "#1A1B1E" : "white" }}>
				<ActionIcon color={error ? "red" : "indigo"} variant={"light"} loading={loading} onClick={onClick}>
					{icon}
				</ActionIcon>
			</div>
		</Tooltip>
	);
};

export default ActionButton;
