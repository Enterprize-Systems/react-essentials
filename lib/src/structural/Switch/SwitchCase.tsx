import { ReactNode } from 'react';

/**
 * Structural directive to be used with {@link Switch}. Represents a condition, or a set of
 * conditions, to be matched against an expression to determine if it will be rendered or not. The
 * children can be a factory, similar to {@link If}.
 * @since 0.1.0
 */
export function SwitchCase({ children }: SwitchCaseProps) {
	return <>{typeof children === 'function' ? children() : children}</>;
}

/**
 * {@link SwitchCase} component properties interface definition.
 * @since 1.0.0
 */
export interface SwitchCaseProps {
	/**
	 * The children or factory.
	 */
	children: () => ReactNode;
	/**
	 * Condition of set of conditions to compare. If a set of conditions is used, an OR operation is
	 * used, in other words, if one condition match, the case will be rendered.
	 */
	when: any | Array<any>
}
