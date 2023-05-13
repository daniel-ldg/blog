import { Configuration, OpenAIApi } from "openai";

const apiKey = process.env.OPENAI_API_KEY;
const organization = process.env.OPENAI_API_ORG;

const configuration = new Configuration({
	organization,
	apiKey,
});

export const OpenAI = new OpenAIApi(configuration);
