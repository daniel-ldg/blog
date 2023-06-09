import { Stack } from "@mantine/core";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import ActionRevalidate from "./ActionRevalidate";
import React from "react";
import ActionManageImages from "./post/ActionManageImages";
import ActionDeletePost from "./post/ActionDeletePost";

const QuickActions: React.FC = () => {
	const { status } = useSession();
	const { pathname, asPath, reload } = useRouter();

	const isAuthenticated = status === "authenticated";
	if (!isAuthenticated) {
		return <></>;
	}

	let actions: React.ReactElement[] = [];

	const isPost = pathname === "/post/[url]";
	if (isPost) {
		actions.push(<ActionRevalidate path={asPath} onRevalidation={reload} />);
		actions.push(<ActionManageImages postPath={asPath} />);
		actions.push(<ActionDeletePost postPath={asPath} />);
	}

	if (!actions.length) {
		return <></>;
	}

	return (
		<Stack mt='sm' style={{ position: "absolute", top: 0, right: 10 }}>
			{actions.map((action, i) => (
				<React.Fragment key={i}>{action}</React.Fragment>
			))}
		</Stack>
	);
};

export default QuickActions;
