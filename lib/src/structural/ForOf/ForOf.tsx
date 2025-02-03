import { Fragment } from 'react';

import { Key, RequiredKeys } from '../../helpers';

/**
 * Loops into an array of objects outputting the JSX.Element provided on the children function.
 * T - The type of the elements in the array.
 * @since 1.0.0
 */
export function ForOf<T>({
	items = [],
	keyAttribute,
	useIndexAsKey = false,
	useItselfAsKey = false,
	children
}: ForOfProps<T>) {

	//#region Helpers
	/**
	 * Gets the proper key to use on the loop. May use the passed attribute key or the provided
	 * function. If set the {@link ForOfProps.useIndexAsKey} will use the index. Otherwise, will return
	 * undefined.
	 * @param iteration The iteration in the loop
	 * @return The key to be used or undefined if not configured.
	 */
	const getKey = (iteration: ForOfIteration<T>): Key => {
		if (useIndexAsKey) {
			return iteration.index;
		}
		if (useItselfAsKey) {
			return iteration.item as Key;
		}
		if (keyAttribute != null) {
			if (typeof keyAttribute === 'function') {
				return keyAttribute(iteration);
			}
			else {
				return Reflect.get(iteration.item as object, keyAttribute);
			}
		}

		return undefined;
	};
	//#endregion

	//#region Render
	return <>
		{items.map((value, index, array) => {
			const iteration: ForOfIteration<T> = {
				item: value,
				index: index,
				length: array.length,
				isOdd: index % 2 !== 0,
				isEven: index % 2 === 0,
				isFirst: index === 0,
				isLast: index === array.length - 1
			};

			return (
				<Fragment key={getKey(iteration)}>
					{children(iteration)}
				</Fragment>
			);
		})}
	</>;
	//#endregion
}

/**
 * {@link ForOf} component properties interface definition.
 * @since 1.0.0
 */
export interface ForOfProps<T> {
	/**
	 * List of item to iterate.
	 */
	items: Array<T>;
	/**
	 * Function factory for JSX.Element to be rendered.
	 * @param iteration The iteration information. Holds the item and some metadata.
	 */
	children: (iteration: ForOfIteration<T>) => JSX.Element;
	/**
	 * The attribute to be used as key or a factory to generate a value. If not set, will cause the
	 * React warning about keys. You can return the index provided on the iteration object as a
	 * fallback in case no other value is acceptable.
	 */
	keyAttribute?: RequiredKeys<T> | ((iteration: ForOfIteration<T>) => Key);
	/**
	 * Flag that indicates to use the array index as key.
	 * @default false
	 */
	useIndexAsKey?: boolean;
	/**
	 * Flag that indicates to use the iteration "item" as key. Only use this if the item is a
	 * primitive.
	 * @default false
	 */
	useItselfAsKey?: boolean;
}

/**
 * Iteration information in the loop.
 * @since 1.2.0
 */
export interface ForOfIteration<T> {
	/**
	 * The item on the iteration.
	 */
	item: T;
	/**
	 * Index of the current iteration.
	 */
	index: number;
	/**
	 * Length of the array.
	 */
	length: number;
	/**
	 * True if the index is odd.
	 */
	isOdd: boolean;
	/**
	 * True if the index is even (zero is even).
	 */
	isEven: boolean;
	/**
	 * True if this is the first element on the iteration.
	 */
	isFirst: boolean;
	/**
	 * True if this is the last element on the iteration.
	 */
	isLast: boolean;
}

