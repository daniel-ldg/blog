import { useViewportSize } from "@mantine/hooks";

const useViewportWidth = () => {
	const { width } = useViewportSize();
	return {
		width,
		xs: width < 576,
		sm: width >= 576,
		md: width >= 768,
		lg: width >= 992,
		xl: width >= 1200,
	};
};

export default useViewportWidth;
