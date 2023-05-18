import { HSL, rgbaToHsl, stringToRgba } from "@/utils/ColorUtils";
import { useMantineTheme } from "@mantine/core";
import { DOMKeyframesDefinition, ValueAnimationTransition, useAnimate } from "framer-motion";
import { useEffect, useState } from "react";

export type Elevation = "low" | "high";

const useElevation = (initial: Elevation = "low") => {
	const [{ hue, saturation, lightness }, setShadowColor] = useState<HSL>({ hue: 0, saturation: 0, lightness: 0 });
	const [elevation, setElevation] = useState<Elevation>(initial);
	const [scope, animate] = useAnimate();

	const { colorScheme } = useMantineTheme();

	useEffect(() => {
		const isDarkMode = colorScheme === "dark";
		setShadowColor(prev => {
			let lightness;
			if (isDarkMode) {
				lightness = Math.max(50, prev.lightness * 1.5);
			} else {
				lightness = Math.min(0, prev.lightness * 0.5);
			}
			return { ...prev, lightness };
		});
	}, [colorScheme]);

	// tint shadow
	/*useEffect(() => {
		const parent = scope?.current?.parentNode;
		const parentColor: string = parent?.computedStyleMap()?.get("background-color")?.toString();
		if (parentColor) {
			stringToRgba(parentColor)
				.then(rgba => rgbaToHsl(rgba))
				.then(({ hue, saturation, lightness }) => ({
					hue,
					saturation: saturation * 0.5,
					lightness: lightness * 0.5,
				}))
				.then(hsl => setShadowColor(hsl));
		}
	}, [scope?.current]);*/

	useEffect(() => {
		const low: DOMKeyframesDefinition = {
			boxShadow: `0px 0px 0px hsl(${hue}deg ${saturation}% ${lightness}% / 0),
                    0px 0px 0px -0px hsl(${hue}deg ${saturation}% ${lightness}% / 0),
                    0px 0px 0px 0px hsl(${hue}deg ${saturation}% ${lightness}% / 0),
                    0px 0px 0px 0px hsl(${hue}deg ${saturation}% ${lightness}% / 0)`,
			y: 0,
		};

		const high: DOMKeyframesDefinition = {
			boxShadow: `0.3px 0.3px 0.7px hsl(${hue}deg ${saturation}% ${lightness}% / 0.36),
                    0.8px 0.8px 2px -0.8px hsl(${hue}deg ${saturation}% ${lightness}% / 0.36),
                    2.1px 2.1px 5.2px -1.7px hsl(${hue}deg ${saturation}% ${lightness}% / 0.36),
                    5px 5px 12.6px -2.5px hsl(${hue}deg ${saturation}% ${lightness}% / 0.36)`,
			y: -2,
		};
		const options: ValueAnimationTransition = { duration: 0.3 };
		const animation = elevation === "low" ? low : high;
		animate(scope.current, animation, options);
	}, [elevation]);

	return { ref: scope, setElevation };
};

export default useElevation;
