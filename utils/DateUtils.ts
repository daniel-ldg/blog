export const formatDate = (date: Date, style: "short" | "medium" | "full" | "long" = "full") => {
	const dateOptions: Intl.DateTimeFormatOptions = {
		dateStyle: style,
	};
	return date.toLocaleDateString("es-MX", dateOptions);
};
