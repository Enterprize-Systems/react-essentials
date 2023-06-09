import { FC, ReactNode } from 'react';

/**
 * Conditionally renders its children. Accepts an optional else element to be shown. The children
 * can be a factory, so it properly prevents React from parsing the children and causing code
 * that relies on values that can be undefined/null to throw exceptions.
 * @param props
 * @since 1.0.0
 */
export const If: FC<IfProps> = props => {

    //#region Render
    return (
        <>
            {props.expression
                ? typeof props.children === 'function' ? props.children() : props.children
                : props.else != undefined
                    ? typeof props.else === 'function' ? props.else() : props.else
                    : null}
        </>
    );
    //#endregion
};

/**
 * {@link If} component properties interface definition.
 * @since 1.0.0
 */
export interface IfProps {
    /**
     * The children or factory.
     */
    children: ReactNode | (() => ReactNode);
    /**
     * Expression to conditionally show the children. If <code>true</code> shows the children,
     * otherwise if {@link else} is defined, will show its element, otherwise will not render
     * anything.
     */
    expression: boolean;
    /**
     * The "else" of the "if..else" statement. React child or factory to show when the {@link expression}
     * results in <code>False</code>.
     */
    else?: ReactNode | (() => ReactNode);
}
