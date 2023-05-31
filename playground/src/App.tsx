import { If, ForOf, Switch, SwitchCase, SwitchCaseDefault } from '@enterprize/react-essentials';
import classes from './App.module.scss';
import { useState } from 'react';

function App() {

    const [ifExampleShow, setIfExampleShow] = useState<boolean>(true);
    const [switchExampleValue, setSwitchExampleValue] = useState('');

    return (
        <div className={classes.pageContainer}>
            <header className={classes.header}>
                <h1>React Essentials Playground</h1>
            </header>
            <div className={classes.content}>
                <article>
                    <header className={classes.articleHeader}>
                        <h2>If (Structural)</h2>
                    </header>
                    <div>
                        <div className={classes.description}>
                            <h3>Description</h3>
                            <p>Use <code>If</code> to dynamically show or hide pieces of JSX.</p>
                        </div>
                        <div className={classes.props}>
                            <h3>Props</h3>
                            <small>Props marked with <span className={classes.required}>*</span> are
                                required</small>
                            <table>
                                <thead>
                                    <tr>
                                        <th className={classes.thProp}>Prop</th>
                                        <th className={classes.thDefault}>Default</th>
                                        <th>Description</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><code>expression</code> <span
                                            className={classes.required}>*</span></td>
                                        <td></td>
                                        <td>Expression to conditionally show the children.
                                            If <code>true</code> shows the children, otherwise
                                            if <code>else</code> is defined, will show its element,
                                            otherwise will not render anything.
                                        </td>
                                    </tr>
                                    <tr>
                                        <td><code>else</code></td>
                                        <td></td>
                                        <td>The "else" of the "if..else" statement. JSX.Element to
                                            show when the <code>expression</code> results
                                            in <code>False</code>.
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className={classes.example}>
                            <button
                                type="button"
                                onClick={() => setIfExampleShow(old => !old)}>
                                Toggle show/hide
                            </button>
                            <br />
                            <If expression={ifExampleShow}>
                                I am displayed!
                            </If>
                            <br />
                            <If
                                expression={ifExampleShow}
                                else={<>I am the else</>}>
                                I am displayed!
                            </If>
                        </div>
                    </div>
                </article>
                <hr />
                <article>
                    <header className={classes.articleHeader}>
                        <h2>Switch (Structural)</h2>
                    </header>
                    <div>
                        <div className={classes.description}>
                            <h3>Description</h3>
                            <p>Use <code>Switch</code> to dynamically show or hide pieces of JSX using a <code>switch..case..default</code> approach. Use <code>SwitchCase</code> as <code>case</code> statement and optionally <code>SwitchCaseDefault</code> for <code>default</code> statement</p>
                        </div>
                        <div className={classes.props}>
                            <h3>Props</h3>
                            <small>Props marked with <span className={classes.required}>*</span> are
                                required</small>
                            <table>
                                <thead>
                                    <tr>
                                        <th className={classes.thProp}>Prop</th>
                                        <th className={classes.thDefault}>Default</th>
                                        <th>Description</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><code>expression</code> <span
                                            className={classes.required}>*</span></td>
                                        <td></td>
                                        <td>Expression to evaluate. Can be any value. This value will be compared on each <code>SwitchCase</code> block and if matches will display the assigned content. If none matches and a <code>SwitchCaseDefault</code> is set, will display its contents instead.
                                        </td>
                                    </tr>
                                    <tr>
                                        <td><code>children</code></td>
                                        <td></td>
                                        <td>List of <code>SwitchCase</code> or <code>SwitchCaseDefault</code> child/children.
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className={classes.example}>
                            <select onChange={event => setSwitchExampleValue(event.target.value)}>
                                <option value="">- None -</option>
                                <option value="value_1">Value 1</option>
                                <option value="value_2">Value 2</option>
                                <option value="value_3">Value 3</option>
                            </select>

                            <br />
                            <Switch expression={switchExampleValue}>
                                <SwitchCase when={'value_1'}>Case: Value 1 selected</SwitchCase>
                                <SwitchCase when={'value_2'}>Case: Value 2 selected</SwitchCase>
                                <SwitchCase when={'value_3'}>Case: Value 3 selected</SwitchCase>
                                <SwitchCaseDefault>Default: None selected</SwitchCaseDefault>
                            </Switch>
                        </div>
                    </div>
                </article>
                <hr />
                <article>
                    <header className={classes.articleHeader}>
                        <h2>ForOf (Structural)</h2>
                    </header>
                    <div>
                        <div className={classes.description}>
                            <h3>Description</h3>
                            <p>Use <code>ForOf</code> to iterate over Arrays to generate a list of elements. Can be configured to use different types of keys: index, object property and a computed value.</p>
                        </div>
                        <div className={classes.props}>
                            <h3>Props</h3>
                            <small>Props marked with <span className={classes.required}>*</span> are
                                required</small>
                            <table>
                                <thead>
                                    <tr>
                                        <th className={classes.thProp}>Prop</th>
                                        <th className={classes.thDefault}>Default</th>
                                        <th>Description</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><code>items</code> <span
                                            className={classes.required}>*</span></td>
                                        <td></td>
                                        <td>List of item to iterate.
                                        </td>
                                    </tr>
                                    <tr>
                                        <td><code>children</code></td>
                                        <td></td>
                                        <td>
                                            Function factory for JSX.Element to be rendered. This function will be called with the following params:
                                            <ul>
                                                <li><code>item</code> The item in the current loop iteration.</li>
                                                <li><code>index</code> The index position of the item.</li>
                                                <li><code>length</code> The length of the array being iterated.</li>
                                                <li><code>isOdd</code> If the index is odd.</li>
                                                <li><code>isEven</code> If the index is even.</li>
                                                <li><code>isFirst</code> If the index is the last position of the array.</li>
                                                <li><code>isLast</code> If the index is the first position of the array.</li>
                                            </ul>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className={classes.example}>
                            <p>Itself as key. Array: {JSON.stringify(['One', 'Two', 'Tree'], null, 2)}</p>
                            <ForOf
                                items={['One', 'Two', 'Tree']}
                                useItselfAsKey={true}>
                                {(item: string, index: number, length: number, isOdd: boolean, isEven: boolean, isFirst: boolean, isLast: boolean) => (
                                    <div>
                                        {item} | Index {index} | Length {length} | Is Odd? {String(isOdd)} | Is Even {String(isEven)} | Is First? {String(isFirst)} | Is Last {String(isLast)}
                                    </div>
                                )}
                            </ForOf>
                            <br />
                            <p>Object attribute as key. Array: {JSON.stringify([{id: 1, value: 'One'}, {id: 2, value: 'Two'}, {id: 3, value: 'Tree'}], null, 2)}</p>
                            <ForOf
                                items={[{id: 1, value: 'One'}, {id: 2, value: 'Two'}, {id: 3, value: 'Tree'}]}
                                keyAttribute={'id'}>
                                {(item: {id: number, value: string}, index: number, length: number, isOdd: boolean, isEven: boolean, isFirst: boolean, isLast: boolean) => (
                                    <div>
                                        {JSON.stringify(item)} | Index {index} | Length {length} | Is Odd? {String(isOdd)} | Is Even {String(isEven)} | Is First? {String(isFirst)} | Is Last {String(isLast)}
                                    </div>
                                )}
                            </ForOf>
                        </div>
                    </div>
                </article>
            </div>
        </div>
    );
}

export default App;
