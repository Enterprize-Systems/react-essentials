import { FC, ReactNode } from 'react';

/**
 * Structural directive to be used with {@link Switch}. Represents a default child to render if no
 * {@link SwitchCase} conditions are met. Must be the last child on {@link Switch} and only one
 * default is allowed. The children can be a factory, similar to {@link If}.
 * @since 0.1.0
 */
export const SwitchCaseDefault: FC<SwitchCaseDefaultProps> = props => {
    return (
        <>
            {typeof props.children === 'function' ? props.children() : props.children}
        </>
    );
};

export type SwitchCaseDefaultProps = {
    /**
     * The children or factory.
     */
    children: ReactNode | (() => ReactNode);
}
