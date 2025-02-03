import { ReactNode } from 'react';

/**
 * Conditionally renders its children. Accepts an optional else element to be shown. The children
 * can be a factory, so it properly prevents React from parsing the children and causing code
 * that relies on values that can be undefined/null to throw exceptions.
 * @since 1.0.0
 */
export function If({ expression, else: elseFactory, children }: IfProps) {

	//#region Render
	return <>
		{expression
			? children()
			: elseFactory != undefined
				? elseFactory()
				: null}
	</>;
	//#endregion
}

/**
 * {@link If} component properties interface definition.
 * @since 1.0.0
 */
export interface IfProps {
	/**
	 * React child element factory.
	 */
	children: () => ReactNode;
	/**
	 * Expression to conditionally show the children. If <code>true</code> shows the children,
	 * otherwise if {@link else} is defined, will show its element, otherwise will not render
	 * anything.
	 */
	expression: boolean;
	/**
	 * The "else" of the "if..else" statement. React child element factory to show when the
	 * {@link expression} results in <code>false</code>.
	 */
	else?: () => ReactNode;
}
