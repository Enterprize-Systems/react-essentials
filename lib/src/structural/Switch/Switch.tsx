import { ReactElement } from 'react';

import { SwitchCase, SwitchCaseProps } from './SwitchCase';
import { SwitchCaseDefault } from './SwitchCaseDefault';

/**
 * Structural component to conditionally render content based on a switch/case/default syntax. If
 * multiple {@link SwitchCase} "when" matches the expression, only the first one will be rendered.
 * @example
 *  <Switch expression={issueHttpRequest.status}>
 *      <SwitchCase when={[HttpRequestStatusEnum.NOT_SENT, HttpRequestStatusEnum.ABORTED]}>
 *          Click on "fetch" to fetch the issue
 *      </SwitchCase>
 *      <SwitchCase when={HttpRequestStatusEnum.SENDING}>
 *          Fetching... <FontAwesomeIcon icon={faCircleNotch} spin/>
 *      </SwitchCase>
 *      <SwitchCase when={HttpRequestStatusEnum.ERROR}>
 *          Error while fetching the issue data
 *      </SwitchCase>
 *      <SwitchCaseDefault>
 *          {JSON.stringify(issueHttpRequest.result, null, 4)}
 *      </SwitchCaseDefault>
 *  </Switch>
 *  @since 1.0.0
 */
export function Switch({ expression, children }: SwitchProps) {

	//#region Render
	//if no children, nothing to render
	if ((Array.isArray(children) && children.length === 0) || children == undefined) {
		return null;
	}
	
	const childrenAsArray = Array.isArray(children) ? children : [children];

	// If a {@link SwitchCaseDefault} is defined and no {@link SwitchCase} is match, will render it/
	const switchCaseDefaultToRender: null | ReactElement<void, typeof SwitchCaseDefault> =
		childrenAsArray[childrenAsArray.length - 1]!.type === SwitchCaseDefault
			? childrenAsArray[childrenAsArray.length - 1] as ReactElement<void, typeof SwitchCaseDefault>
			: null;
	// If a {@link SwitchCase} condition matches, will render it.
	let switchCaseToRender: null | ReactElement<SwitchCaseProps, typeof SwitchCase> = null;

	const length: number = switchCaseDefaultToRender != null
		? childrenAsArray.length - 1
		: childrenAsArray.length;

	switchCaseLoop:
	for (let i = 0; i < length; i++) {
		const child = childrenAsArray[i] as ReactElement<SwitchCaseProps, typeof SwitchCase>;
		if (child.type !== SwitchCase) {
			throw new Error(
				'All direct children elements of Switch must be of type SwitchCase or SwitchCaseDefault');
		}

		if (Array.isArray(child.props.when)) {
			for (const childWhen of child.props.when) {
				if (childWhen === expression) {
					switchCaseToRender = child;
					break switchCaseLoop;
				}
			}
		}
		else if (child.props.when === expression) {
			switchCaseToRender = child;
			break;
		}
	}

	return <>{switchCaseToRender != null ? switchCaseToRender : switchCaseDefaultToRender}</>;
	//#endregion
}

/**
 * {@link Switch} component properties interface definition.
 * @since 1.0.0
 */
export interface SwitchProps {
	/**
	 * Expression to evaluate.
	 */
	expression: any;
	/**
	 * List of {@link SwitchCase} or {@link SwitchCaseDefault} child/children.
	 */
	children?: ReactElement<SwitchCaseProps, typeof SwitchCase> | ReactElement<void, typeof SwitchCaseDefault>
		| [...ReactElement<SwitchCaseProps, typeof SwitchCase>[], ReactElement<void, typeof SwitchCaseDefault>]
}
