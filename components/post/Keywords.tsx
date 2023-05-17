import useElevation from "@/hooks/useElevation";
import { Badge, Flex } from "@mantine/core";
import { useHover, useMergedRef } from "@mantine/hooks";
import Link, { LinkProps } from "next/link";
import React, { useEffect } from "react";

interface IProps {
	keywords: string[];
	asLink?: boolean;
	hideOverflow?: boolean;
}

const Keywords: React.FC<IProps> = ({ keywords, asLink = false, hideOverflow = true }) => {
	return (
		<Flex gap='sm' style={hideOverflow ? { flexWrap: "wrap", overflow: "hidden", height: "18px" } : { flexWrap: "wrap" }}>
			{keywords.map((keyword, i) =>
				asLink ? (
					<Link key={i} href={{ pathname: "/buscar", query: { keyword } }} passHref legacyBehavior>
						<ClickBadge label={keyword} />
					</Link>
				) : (
					<Badge key={i} size='sm' color='gray' variant='outline' style={{ height: "18px" }}>
						{keyword}
					</Badge>
				)
			)}
		</Flex>
	);
};

interface IPropsBadge extends Partial<LinkProps> {
	label: string;
}

const ClickBadge = React.forwardRef<HTMLAnchorElement, IPropsBadge>(({ href, onClick, label }, ref) => {
	const { ref: hoverRef, hovered } = useHover<HTMLAnchorElement>();
	const { ref: elevationRef, setElevation } = useElevation();

	useEffect(() => {
		setElevation(hovered ? "high" : "low");
	}, [hovered]);

	const mergedRef = useMergedRef(ref, hoverRef, elevationRef);

	return (
		<Badge
			component='a'
			href={href?.toString()}
			onClick={onClick}
			ref={mergedRef}
			size='sm'
			color='gray'
			variant='outline'
			style={{ height: "18px", cursor: "pointer" }}>
			{label}
		</Badge>
	);
});

ClickBadge.displayName = "ClickBadge";

export default Keywords;
