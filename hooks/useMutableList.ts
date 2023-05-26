import { useState } from "react";

interface MutableListHook<T> {
	list: T[];
	setList: (list: T[]) => void;
	moveBefore: (index: number) => Promise<T[]>;
	moveAfter: (index: number) => Promise<T[]>;
	remove: (index: number) => Promise<T[]>;
}

const useMutableList = <T = any>(initialList: T[] = []): MutableListHook<T> => {
	const [list, setList] = useState<T[]>(initialList);

	const moveBefore: MutableListHook<T>["moveBefore"] = i => {
		return new Promise((resolve, reject) => {
			if (i === 0 || isOutBoundaries(list, i)) {
				reject();
				return;
			}
			setList(list => {
				const updated = move(list, i, i - 1);
				resolve(updated);
				return updated;
			});
		});
	};

	const moveAfter: MutableListHook<T>["moveAfter"] = i => {
		return new Promise((resolve, reject) => {
			if (i === list.length - 1 || isOutBoundaries(list, i)) {
				reject();
				return;
			}
			setList(list => {
				const updated = move(list, i, i + 1);
				resolve(updated);
				return updated;
			});
		});
	};

	const remove: MutableListHook<T>["remove"] = i => {
		return new Promise((resolve, reject) => {
			if (isOutBoundaries(list, i)) {
				reject();
				return;
			}
			setList(list => {
				const updated = structuredClone(list);
				updated.splice(i, 1);
				resolve(updated);
				return updated;
			});
		});
	};

	return { list, setList, moveBefore, moveAfter, remove };
};

const move = <T>(arr: T[], from: number, to: number): T[] => {
	let listCopy = arr.slice();
	listCopy.splice(from, 0, listCopy.splice(to, 1)[0]);
	return listCopy;
};

const isOutBoundaries = (arr: any[], i: number): boolean => {
	return i < 0 || i >= arr.length;
};

export default useMutableList;
