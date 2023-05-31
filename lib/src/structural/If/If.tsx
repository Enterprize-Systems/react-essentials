import { FC, PropsWithChildren } from 'react';

/**
 * Conditionally renders its children. Accepts an optional else element to be shown.
 * @param props
 * @since 1.0.0
 */
export const If: FC<PropsWithChildren<IfProps>> = props => {

    //#region Render
    return (
        <>
            {props.expression
                ? props.children
                : props.else != undefined
                    ? props.else
                    : null}
        </>
    );
    //#endregion
};

export type IfProps = {
    /**
     * Expression to conditionally show the children. If <code>true</code> shows the children,
     * otherwise if {@link else} is defined, will show its element, otherwise will not render
     * anything.
     */
    expression: boolean;
    /**
     * The "else" of the "if..else" statement. JSX.Element to show when the {@link expression} results
     * in <code>False</code>.
     */
    else?: JSX.Element
}
