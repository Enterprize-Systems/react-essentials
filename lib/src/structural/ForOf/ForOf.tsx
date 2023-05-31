import { Fragment } from 'react';

import { Key, RequiredKeys } from '../../helpers';

/**
 * Loops into an array of objects outputting the JSX.Element provided on the children function.
 * T - The type of the elements in the array.
 * @param props
 */
export const ForOf = <T, >(props: ForOfProps<T>) => {

    //#region Attributes
    const items: Array<T> = props.items ?? [];
    //#endregion

    //#region Helpers
    /**
     * Gets the proper key to use on the loop. May use the passed attribute key or the provided
     * function. If set the {@link ForOfProps.useIndexAsKey} will use the index. Otherwise, will return
     * undefined
     * @param item The item in the current loop iteration
     * @param index The index of the item.
     * @return The key to be used or undefined if not configured.
     */
    const getKey = (item: T, index: number): Key => {
        if (props.useIndexAsKey) {
            return index;
        }
        if (props.useItselfAsKey) {
            return item as Key;
        }
        if (props.keyAttribute != null) {
            if (typeof props.keyAttribute === 'function') {
                return props.keyAttribute(item);
            }
            else {
                return Reflect.get(item as object, props.keyAttribute);
            }
        }

        return undefined;
    };
    //#endregion

    //#region Render
    return (
        <>
            {items.map((value, index, array) => (
                <Fragment key={getKey(value, index)}>
                    {props.children(
                        value,
                        index,
                        array.length,
                        index % 2 !== 0,
                        index % 2 === 0,
                        index === 0,
                        index === array.length - 1
                    )}
                </Fragment>
            ))}
        </>
    );
    //#endregion
};

ForOf.defaultProps = {
    useIndexAsKey: false,
    useItselfAsKey: false
};

export type ForOfProps<T> = {
    /**
     * List of item to iterate.
     */
    items: Array<T>;
    /**
     * Function factory for JSX.Element to be rendered.
     * @param item The item in the current loop iteration.
     * @param index The index position of the item.
     * @param length The length of the array being iterated.
     * @param isOdd If the index is odd.
     * @param isEven If the index is even.
     * @param isFirst If the index is the last position of the array.
     * @param isLast If the index is the first position of the array.
     */
    children: (
        item: T,
        index: number,
        length: number,
        isOdd: boolean,
        isEven: boolean,
        isFirst: boolean,
        isLast: boolean
    ) => JSX.Element;
    /**
     * The attribute to be used as key or a factory to generate a value. If not set, will cause the
     * React warning about keys.
     */
    keyAttribute?: RequiredKeys<T> | ((item: T) => Key);
    /**
     * Flag that indicates to use the array index as key.
     * @default false
     */
    useIndexAsKey?: boolean;
    /**
     * Flag that indicates to use the iteration value as key.
     * @default false
     */
    useItselfAsKey?: boolean;
};

