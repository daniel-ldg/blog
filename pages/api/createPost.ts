import { prismaInstance } from "@/prisma/PrismaInstance";
import { PostCreateOneSchema } from "@/prisma/generated/schemas";
import { storeImageUrl } from "@/services/api/imagekit";
import { OpenAI } from "@/services/api/openai";
import { searchImagesScaleSerp } from "@/services/api/scaleserp";
import { ImageResult, searchImagesSerpApi } from "@/services/api/serpapi";
import { normalize, randomString } from "@/utils/StringUtils";
import { Prisma } from "@prisma/client";
import { createSession } from "better-sse";
import { NextApiHandler } from "next";
import { getServerSession } from "next-auth";
import { CreateChatCompletionRequest } from "openai";
import SuperJSON from "superjson";
import { z } from "zod";
import { authOptions } from "./auth/[...nextauth]";

const prompt = process.env.GPT_PROMPT || "";

const handler: NextApiHandler = async (req, res) => {
	const { method, body } = req;

	const session = await getServerSession(req, res, authOptions);

	if (!session) {
		return res.status(401).end(`Unauthorized`);
	}

	// Allow only POST requests
	if (method !== "POST") {
		res.setHeader("Allow", ["POST"]);
		return res.status(405).end(`Method ${method} Not Allowed`);
	}

	// Validate body input
	const bodyValidation = z
		.object({
			author: z.string(),
			title: z.string().optional(),
		})
		.strict()
		.safeParse(JSON.parse(body));

	if (!bodyValidation.success) {
		return res.status(400).end(JSON.stringify(bodyValidation.error));
	}

	const sse = await createSession(req, res, { serializer: SuperJSON.stringify, keepAlive: 3000, retry: 2000 });

	// Load author from db
	const authorArgs: Prisma.AuthorFindFirstArgsBase = {
		where: { url: bodyValidation.data.author },
	};

	sse.push(genMessage(messages.startAuthorSearch, { buscando: authorArgs }));

	const foundAuthor = await prismaInstance.author.findFirst(authorArgs);

	if (!foundAuthor) {
		sse.push(genMessage(messages.failAuthorSearch));
		return res.end();
	}

	sse.push(genMessage(messages.successAuthorSearch, { encontrado: { name: foundAuthor.name } }));

	// Prompt OpenAI API
	const completionRequest: CreateChatCompletionRequest = {
		model: "gpt-3.5-turbo",
		temperature: 1.1,
		messages: [
			{ role: "system", content: foundAuthor.prompt },
			{ role: "system", content: "Contesta únicamente objetos json" },
			{ role: "user", content: prompt },
		],
	};

	if (bodyValidation.data.title) {
		completionRequest.messages.push({
			role: "user",
			content: `Usa el tema principal (título): "${bodyValidation.data.title}"`,
		});
	}

	sse.push(genMessage(messages.startPrompt, { request: completionRequest }));

	let openAIresponse;
	try {
		openAIresponse = await OpenAI.createChatCompletion(completionRequest);
	} catch (error) {
		sse.push(genMessage(messages.failPrompt, { error }));
		return res.end();
	}

	sse.push(genMessage(messages.successPrompt, { response: openAIresponse.data }));

	// validate response
	sse.push(genMessage(messages.startValidation));
	const responseValidation = z
		.object({
			title: z.string(),
			introduction: z.string().array(),
			quote: z.object({
				author: z.string(),
				text: z.string(),
			}),
			sections: z
				.object({
					subtitle: z.string(),
					content: z.array(z.string()),
				})
				.array(),
			conclusion: z.string().array(),
			keywords: z.string().array(),
			searchQuery: z.string(),
		})
		.strict();

	type ExpectedResponse = z.infer<typeof responseValidation>;
	let responseObject: ExpectedResponse;
	try {
		const json = JSON.parse(openAIresponse.data.choices.at(0)!.message!.content);
		responseObject = responseValidation.parse(json);
	} catch (error) {
		sse.push(genMessage(messages.failValidation, { error }));
		return res.end();
	}
	sse.push(genMessage(messages.successValidation, { responseObject }));

	// search images
	let foundImages: ImageResult[] = [];

	sse.push(genMessage(messages.startImageSearch, { serp_api: responseObject.searchQuery }, 0));
	const serpApiResponse = await searchImagesSerpApi(responseObject.searchQuery);
	if (!serpApiResponse.length) {
		sse.push(genMessage(messages.failImageSearch, { serpApiResponse }, 0));
	} else {
		foundImages = serpApiResponse;
		sse.push(genMessage(messages.successImageSearch, { serpApiResponse }, 0));
	}

	if (!foundImages.length) {
		sse.push(genMessage(messages.startImageSearch, { scale_serp: responseObject.searchQuery }, 1));
		const scaleSerpResponse = await searchImagesScaleSerp(responseObject.searchQuery);
		if (!scaleSerpResponse.length) {
			sse.push(genMessage(messages.failImageSearch, { scaleSerpResponse }, 1));
		} else {
			foundImages = scaleSerpResponse;
			sse.push(genMessage(messages.successImageSearch, { scaleSerpResponse }, 1));
		}
	}

	// upload up to 3 images
	const selectedImages = foundImages
		.filter(image => image.url !== undefined)
		.filter(image => image.height <= 1000)
		.filter(image => !image.url.endsWith("gif"))
		.slice(0, 10) // the best (first) results (up to 10 images)
		.sort(() => 0.5 - Math.random()) // random shift
		.slice(0, 3); // select up to 3 results

	let uploadPromises: Promise<ImageResult>[] = [];
	selectedImages.forEach((image, i) => {
		sse.push(genMessage(messages.startSaveImages, { image }, i));
		uploadPromises.push(
			storeImageUrl(image.url, image.url.substring(image.url.lastIndexOf("/") + 1))
				.then(uploadResult => {
					const uploaded = { ...image, url: uploadResult.url };
					sse.push(genMessage(messages.successSaveImages, { uploaded }, i));
					return uploaded;
				})
				.catch(error => {
					sse.push(genMessage(messages.failSaveImage, { error }, i));
					throw error;
				})
		);
	});

	const uploaded = (
		(await Promise.allSettled(uploadPromises)).filter(
			r => r.status === "fulfilled"
		) as PromiseFulfilledResult<ImageResult>[]
	).map(r => r.value);

	// wrap up all content and save it on db
	const { title, keywords, sections, introduction, conclusion, quote } = responseObject;
	const postArgs: Prisma.PostCreateArgs = {
		data: {
			author: { connect: { id: foundAuthor.id } },
			url: randomString(5) + "-" + normalize(title),
			title,
			keywords: keywords.map(str => str.toLowerCase()),
			sections: sections.map(section => ({ title: section.subtitle, paragraphs: section.content })),
			introduction,
			conclusion,
			quote,
			images: uploaded,
		},
	};

	sse.push(genMessage(messages.startSavePost, { postArgs }));

	const postValidation = PostCreateOneSchema.safeParse(postArgs);
	if (!postValidation.success) {
		const { error } = postValidation;
		sse.push(genMessage(messages.failSavePost, { error }));
		return res.end();
	}

	const savedPost = await prismaInstance.post.create(postValidation.data);

	sse.push(genMessage(messages.successSavePost, { savedPost }));

	res.end();
};

const genMessage = (message: Message, metadata: object = {}, instance: number = 0): SentEvent => {
	const timestamp = new Date().getTime();
	return { ...message, step: `${message.step}_${instance}`, metadata, timestamp };
};

type Step = "search_author" | "prompt_chatgpt" | "validating_chatgpt" | "search_image" | "store_image" | "save_post";

export interface Message {
	step: Step;
	state: "start" | "fail" | "success";
	message: string;
}

const messages: Record<string, Message> = {
	startAuthorSearch: { step: "search_author", state: "start", message: "Buscando autor en la base de datos..." },
	successAuthorSearch: { step: "search_author", state: "success", message: "El autor ha sido encontrado con éxito." },
	failAuthorSearch: { step: "search_author", state: "fail", message: "No se encontró ningún autor en la base de datos." },
	startPrompt: { step: "prompt_chatgpt", state: "start", message: "Generando el post con OpenAI API..." },
	successPrompt: { step: "prompt_chatgpt", state: "success", message: "El post ha sido generado con éxito." },
	failPrompt: { step: "prompt_chatgpt", state: "fail", message: "Ha ocurrido un error al generar el post." },
	startValidation: { step: "validating_chatgpt", state: "start", message: "Verificando post generado..." },
	successValidation: {
		step: "validating_chatgpt",
		state: "success",
		message: "El post ha sido verificado y cumple con los requisitos necesarios.",
	},
	failValidation: {
		step: "validating_chatgpt",
		state: "fail",
		message: "El post generado no cumple con los requisitos necesarios.",
	},
	startImageSearch: { step: "search_image", state: "start", message: "Buscando imágenes relacionadas al post en Google..." },
	successImageSearch: {
		step: "search_image",
		state: "success",
		message: "Las imágenes relacionadas han sido encontradas con éxito.",
	},
	failImageSearch: {
		step: "search_image",
		state: "fail",
		message: "No se encontraron imágenes relacionadas al post generado.",
	},
	startSaveImages: { step: "store_image", state: "start", message: "Guardando imagen en CDN..." },
	successSaveImages: { step: "store_image", state: "success", message: "La imagen ha sido guardada en el CDN con éxito." },
	failSaveImage: { step: "store_image", state: "fail", message: "Ha ocurrido un error al guardar la imagen en el CDN." },
	startSavePost: { step: "save_post", state: "start", message: "Guardando post en la base de datos..." },
	successSavePost: {
		step: "save_post",
		state: "success",
		message: "El post ha sido guardado en la base de datos con éxito.",
	},
	failSavePost: { step: "save_post", state: "fail", message: "Ha ocurrido un error al guardar el post en la base de datos." },
};

interface Metadata {
	step: `${Step}_${number}`;
	metadata: object;
	timestamp: number;
}
export type SentEvent = Omit<Message, "step"> & Metadata;

export default handler;
