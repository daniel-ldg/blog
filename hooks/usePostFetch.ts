import { ExtendedPost } from "@/services/posts.service";
import { useEffect, useState } from "react";
import SuperJSON from "superjson";
import useSWRInfinite, { SWRInfiniteFetcher, SWRInfiniteKeyLoader } from "swr/infinite";
import { z } from "zod";

const URL_API = "/api/posts";
const DEFAULT_TAKE = 10;

interface IFetcherArgs {
	author?: string;
	skip?: number;
	take?: number;
}

const fetcher: SWRInfiniteFetcher<ExtendedPost[], SWRInfiniteKeyLoader<ExtendedPost[], IFetcherArgs | null>> = args => {
	const validation = z
		.object({
			author: z.string().optional(),
			skip: z.undefined().or(z.number().transform(n => `${n}`)),
			take: z.undefined().or(z.number().transform(n => `${n}`)),
		})
		.safeParse(args);
	if (!validation.success) {
		return [];
	}
	let { data: params } = validation;
	params = Object.fromEntries(Object.entries(params).filter(([_, v]) => v != undefined));
	const usp = new URLSearchParams(params);
	usp.sort();
	const qs = usp.toString();
	return fetch(`${URL_API}?${qs}`)
		.then(res => res.text())
		.then(text => SuperJSON.parse(text));
};

const getKeyFn = (take: number, author?: string) => {
	const getKey: SWRInfiniteKeyLoader<ExtendedPost[], IFetcherArgs | null> = (index, previousPageData) => {
		if (previousPageData && previousPageData.length < take) {
			return null;
		}
		return { author, take, skip: index * take };
	};
	return getKey;
};

export const useSWRInfinitePosts = (take: number = DEFAULT_TAKE, author?: string) => {
	const [isEndReached, setIsEndReached] = useState(false);
	const { data, setSize, ...swrInfinite } = useSWRInfinite(getKeyFn(take, author), fetcher);

	useEffect(() => {
		setIsEndReached((data?.at(-1)?.length || -Infinity) < take);
	}, [data]);

	const fetchNext = () => {
		if (!isEndReached) {
			setSize(n => n + 1);
		}
	};
	return {
		data,
		isEndReached,
		fetchNext,
		...swrInfinite,
	};
};
