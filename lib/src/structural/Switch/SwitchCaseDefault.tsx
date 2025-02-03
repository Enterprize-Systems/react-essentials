import { ReactNode } from 'react';

/**
 * Structural directive to be used with {@link Switch}. Represents a default child to render if no
 * {@link SwitchCase} conditions are met. Must be the last child on {@link Switch} and only one
 * default is allowed. The children can be a factory, similar to {@link If}.
 * @since 0.1.0
 */
export function SwitchCaseDefault({ children }: SwitchCaseDefaultProps) {
	return <>{typeof children === 'function' ? children() : children}</>;
}

/**
 * {@link SwitchCaseDefault} component properties interface definition.
 * @since 1.0.0
 */
export interface SwitchCaseDefaultProps {
    /**
     * The children or factory.
     */
    children: () => ReactNode;
}
