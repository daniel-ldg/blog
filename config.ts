import dotenv from "dotenv";
import { z } from "zod";
dotenv.config();

const envValidator = z.object({
	DATABASE_URL: z.string().nonempty(),
	SITE_NAME: z.string().nonempty(),
	SITE_HOST: z.string().nonempty(),
});

const initConfig = () => {
	const validateConfig = envValidator.safeParse(process.env);

	if (!validateConfig.success) {
		console.error({ message: "Invalid .env file", ...validateConfig.error.format() });
		process.exit(1);
	}

	return validateConfig.data;
};

export const config = initConfig();
