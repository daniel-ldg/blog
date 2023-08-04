export const getErrorMessage = (error: unknown) => {
	let message = "Unknown Error";
	if (error instanceof Error) {
		message = error.message;
	}
	return message;
};
