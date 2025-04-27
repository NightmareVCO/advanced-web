import { useMemo, useRef } from 'react';

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
type noop = (this: any, ...args: any[]) => any;

type PickFunction<T extends noop> = (
	this: ThisParameterType<T>,
	...args: Parameters<T>
) => ReturnType<T>;

export function useMemoizedCallback<T extends noop>(fn: T) {
	const fnRef = useRef<T>(fn);

	fnRef.current = useMemo<T>(() => fn, [fn]);

	// @ts-ignore
	const memoizedFn = useRef<PickFunction<T>>();

	if (!memoizedFn.current) {
		memoizedFn.current = function (this, ...args) {
			return fnRef.current.apply(this, args);
		};
	}

	return memoizedFn.current as T;
}
