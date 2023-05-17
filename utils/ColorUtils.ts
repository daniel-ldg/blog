export interface RGBA {
	red: number;
	green: number;
	blue: number;
	alpha: number;
}

export interface HSL {
	hue: number;
	saturation: number;
	lightness: number;
}

const isOnRange = (value: number, min: number, max: number) => value >= min && value <= max;
const isOnRgbRange = (value: number) => isOnRange(value, 0, 255);
const isOnAlphaRange = (value: number) => isOnRange(value, 0, 1);
const isOnHueRange = (value: number) => isOnRange(value, 0, 360);
const isOnPercentRange = (value: number) => isOnRange(value, 0, 100);

export const stringToRgba = (color: string) => {
	return new Promise<RGBA>((resolve, reject) => {
		const regex = /^(rgba?)\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(,\s*([\d.]+)\s*)?\)$/;
		const matches = color.match(regex);

		if (!matches) {
			reject(new Error("Formato de color inválido"));
			return;
		}

		const isAlpha = matches[1] === "rgba";
		const red = parseInt(matches[2]);
		const green = parseInt(matches[3]);
		const blue = parseInt(matches[4]);
		const alpha = isAlpha ? parseFloat(matches[6]) : 1;

		if (!isOnRgbRange(red) || !isOnRgbRange(green) || !isOnRgbRange(blue)) {
			reject(new Error("Valores de RGB fuera de rango (0-255)"));
			return;
		}

		if (isAlpha && !isOnAlphaRange(alpha)) {
			reject(new Error("Valor de alfa fuera de rango (0-1)"));
			return;
		}

		resolve({
			red,
			green,
			blue,
			alpha,
		});
	});
};

export const rgbaToHsl = ({ red, green, blue, alpha }: RGBA) => {
	return new Promise<HSL>((resolve, reject) => {
		if (!isOnRgbRange(red) || !isOnRgbRange(green) || !isOnRgbRange(blue)) {
			reject(new Error("Valores de RGB fuera de rango (0-255)"));
			return;
		}

		const normalizedRed = red / 255;
		const normalizedGreen = green / 255;
		const normalizedBlue = blue / 255;

		const max = Math.max(normalizedRed, normalizedGreen, normalizedBlue);
		const min = Math.min(normalizedRed, normalizedGreen, normalizedBlue);

		let hue, saturation, lightness;

		lightness = (max + min) / 2;

		if (max === min) {
			hue = 0;
			saturation = 0;
		} else {
			const delta = max - min;
			saturation = delta / (1 - Math.abs(2 * lightness - 1));

			if (max === normalizedRed) {
				hue = (normalizedGreen - normalizedBlue) / delta;
			} else if (max === normalizedGreen) {
				hue = 2 + (normalizedBlue - normalizedRed) / delta;
			} else {
				hue = 4 + (normalizedRed - normalizedGreen) / delta;
			}

			hue *= 60;

			if (hue < 0) {
				hue += 360;
			}
		}

		saturation = Math.round(saturation * 100);
		lightness = Math.round(lightness * 100);

		resolve({ hue, saturation, lightness });
	});
};

export const hslToString = ({ hue, saturation, lightness }: HSL) => {
	return new Promise<string>((resolve, reject) => {
		if (!isOnHueRange(hue)) {
			reject(new Error("Valor de Tono fuera de rango (0-360)"));
			return;
		}

		if (!isOnPercentRange(saturation)) {
			reject(new Error("Valor de saturación fuera de rango (0-100)"));
			return;
		}

		if (!isOnPercentRange(lightness)) {
			reject(new Error("Valor de luminosidad fuera de rango (0-100)"));
			return;
		}

		resolve(`hsla(${Math.round(hue)}, ${saturation}%, ${lightness})`);
	});
};
