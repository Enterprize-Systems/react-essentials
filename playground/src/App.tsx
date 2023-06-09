import { If, ForOf, Switch, SwitchCase, SwitchCaseDefault, classList } from '@enterprize/react-essentials';
import { useState } from 'react';
import { Highlighter } from 'rc-highlight';

import classes from './App.module.scss';

const ifExampleCode =
`
const [ifExampleShow, setIfExampleShow] = useState<boolean>(true);
const ifExampleOuter = ifExampleShow ? { message: 'Outer dependency works' } : null;

return (
  <div>
    <button
      type="button"
      onClick={() => setIfExampleShow(old => !old)}>
      Toggle show/hide
    </button>
    <br/>
    
    {/*It is important to use factories as body to prevent React from processing the JSX.*/}
    {/*Doing this allows us to use the "!" TS operator to easier catch logic bugs.*/}
    <If expression={ifExampleShow}>
      {() => <>I am displayed! {ifExampleOuter!.message}</>}
    </If>
        
    {/*The else can also be a factories to prevent React from processing the JSX.*/}
    {/*Otherwise safe navigation must always be used if something might be null/undefined.*/}
    <br/>
    <If
      expression={ifExampleShow}
      else={<>I am the else. {ifExampleOuter?.message}</>}>
      I am displayed!
    </If>
  </div>
);
`;

const switchExampleCode =
`
const [switchExampleValue, setSwitchExampleValue] = useState('');
const switchExampleOuter = switchExampleValue === 'value_1' ? { message: 'Outer dependency works' } : null;

return (
  <div>
    <select
      onChange={event => setSwitchExampleValue(event.target.value)}>
      <option value="">- None -</option>
      <option value="value_1">Value 1</option>
      <option value="value_2">Value 2</option>
      <option value="value_3">Value 3</option>
    </select>

    <br/>
    <Switch expression={switchExampleValue}>
      {/*It is important to use factories as body to prevent React from processing the JSX.*/}
      {/*Doing this allows us to use the "!" TS operator to easier catch logic bugs.*/}
      <SwitchCase when={'value_1'}>
        {() => <>Case: Value 1 selected {switchExampleOuter!.message}</>}
      </SwitchCase>
      
      {/*The else can also be a factories to prevent React from processing the JSX.*/}
      {/*Otherwise safe navigation must always be used if something might be null/undefined.*/}
      <SwitchCase when={'value_2'}>
        Case: Value 2 selected {switchExampleOuter?.message}
      </SwitchCase>
      
      <SwitchCase when={'value_3'}>Case: Value 3 selected</SwitchCase>
      
      <SwitchCaseDefault>Default: None selected</SwitchCaseDefault>
    </Switch>
  </div>
);
`;

const forOfExampleCode1 =
`
const items = ['One', 'Two', 'Tree']; 

return (
  <ForOf
    items={items}
    useItselfAsKey={true}>
    {/*The child of a ForOf must be a factory. It is invoked with the iteration information.*/}
    {iteration => (
      <div>
        {iteration.item} | Index {iteration.index} | Length {iteration.length} | Is
        Odd? {String(iteration.isOdd)} | Is Even {String(iteration.isEven)} | Is
        First? {String(iteration.isFirst)} | Is Last {String(iteration.isLast)}
      </div>
    )}
  </ForOf>
);
`;

const forOfExampleCode2 =
`
const items = [
  { id: 1, value: 'One' },
  { id: 2, value: 'Two' }, 
  { id: 3, value: 'Tree'}
];

return (
  <ForOf
    items={items}
    keyAttribute={'id'}>{/*You can use an object's property name as key*/}
    {iteration => (
      <div>
        {JSON.stringify(iteration.item)} | Index {iteration.index} |
        Length {iteration.length} |
        Is Odd? {String(iteration.isOdd)} | Is Even {String(iteration.isEven)} | Is
        First? {String(iteration.isFirst)} | Is Last {String(iteration.isLast)}
      </div>
    )}
  </ForOf>
);
`;

const forOfExampleCode3 =
`
const items = [
  { id: 1, value: 'One' },
  { id: 1, value: 'Two' }, 
  { id: 3, value: null}
];

return (
  <ForOf
    items={items}
    keyAttribute={({item, index}) => item.value ?? index }>{/*You can provide a key factory*/}
    {iteration => (
      <div>
        {JSON.stringify(iteration.item)} | Index {iteration.index} |
        Length {iteration.length} |
        Is Odd? {String(iteration.isOdd)} | Is Even {String(iteration.isEven)} | Is
        First? {String(iteration.isFirst)} | Is Last {String(iteration.isLast)}
      </div>
    )}
  </ForOf>
);
`;

const classListExample =
`
const [classListOption, setClassListOption] = useState<string>('');

return (
  <div>
    <select
      onChange={event => setClassListOption(event.target.value)}>
      <option value="">- None -</option>
      <option value="red">Red</option>
      <option value="green">Green</option>
      <option value="blue">Blue</option>
      <option value="global">Global</option>
    </select>

    <br/>
    {/*Each param can be a string (or css module ref) or a map */}
    <p className={classList(
      classes.baseClass,
      {
        [classes.class1]: classListOption === 'red',
        [classes.class2]: classListOption === 'green',
        [classes.class3]: classListOption === 'blue',
        'global-css': classListOption === 'global'
      })}>
      Dynamically colored text using css classes with css modules
    </p>
  </div>
);
`;

function App() {

    const [ifExampleShow, setIfExampleShow] = useState<boolean>(true);
    const ifExampleOuter = ifExampleShow ? { message: 'Outer dependency works' } : null;

    const [switchExampleValue, setSwitchExampleValue] = useState('');
    const switchExampleOuter = switchExampleValue === 'value_1' ? { message: 'Outer dependency works' } : null;

    const [classListOption, setClassListOption] = useState<string>('');

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
                            <p>Conditionally renders its <code>children</code>. Accepts an optional
                                else element to be shown. The <code>children</code> can be a
                                factory, so it properly prevents React from parsing the children and
                                causing code that relies on values that can be undefined/null to
                                throw exceptions.</p>
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
                            <h3>Example</h3>
                            <div>
                                <button
                                    type="button"
                                    onClick={() => setIfExampleShow(old => !old)}>
                                    Toggle show/hide
                                </button>
                                <br/>

                                {/*It is important to use factories as body to prevent React from processing the JSX.*/}
                                {/*Doing this allows us to use the "!" TS operator to easier catch logic bugs.*/}
                                <If expression={ifExampleShow}>
                                    {() => <>I am displayed! {ifExampleOuter!.message}</>}
                                </If>
                                <br/>

                                {/*The else can also be a factories to prevent React from processing the JSX.*/}
                                {/*Otherwise safe navigation must always be used if something might be null/undefined.*/}
                                <If
                                    expression={ifExampleShow}
                                    else={<>I am the else. {ifExampleOuter?.message}</>}>
                                    I am displayed!
                                </If>
                            </div>
                            <br/>
                            <Highlighter>{ifExampleCode}</Highlighter>
                        </div>
                    </div>
                </article>
                <hr/>
                <article>
                    <header className={classes.articleHeader}>
                        <h2>Switch (Structural)</h2>
                    </header>
                    <div>
                        <div className={classes.description}>
                            <h3>Description</h3>
                            <p>Use <code>Switch</code> to dynamically show or hide pieces of JSX using a <code>switch..case..default</code> approach. Use <code>SwitchCase</code> as <code>case</code> statement and optionally <code>SwitchCaseDefault</code> for <code>default</code> statement. The children of <code>SwitchCase</code> and <code>SwitchCaseDefault</code> can be a factory, similar to If.
                            </p>
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
                                        <td>Expression to evaluate. Can be any value. This value
                                            will be compared on each <code>SwitchCase</code> block
                                            and if matches will display the assigned content. If
                                            none matches and a <code>SwitchCaseDefault</code> is
                                            set, will display its contents instead.
                                        </td>
                                    </tr>
                                    <tr>
                                        <td><code>children</code></td>
                                        <td></td>
                                        <td>List
                                            of <code>SwitchCase</code> or <code>SwitchCaseDefault</code> child/children.
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className={classes.example}>
                            <h3>Example</h3>
                            <div>
                                <select
                                    onChange={event => setSwitchExampleValue(event.target.value)}>
                                    <option value="">- None -</option>
                                    <option value="value_1">Value 1</option>
                                    <option value="value_2">Value 2</option>
                                    <option value="value_3">Value 3</option>
                                </select>

                                <br/>
                                <Switch expression={switchExampleValue}>
                                    <SwitchCase when={'value_1'}>
                                        {() => <>Case: Value 1
                                            selected {switchExampleOuter!.message}</>}
                                    </SwitchCase>
                                    <SwitchCase when={'value_2'}>
                                        Case: Value 2 selected {switchExampleOuter?.message}
                                    </SwitchCase>
                                    <SwitchCase when={'value_3'}>Case: Value 3 selected</SwitchCase>
                                    <SwitchCaseDefault>Default: None selected</SwitchCaseDefault>
                                </Switch>
                            </div>
                            <Highlighter>{switchExampleCode}</Highlighter>
                        </div>
                    </div>
                </article>
                <hr/>
                <article>
                    <header className={classes.articleHeader}>
                        <h2>ForOf (Structural)</h2>
                    </header>
                    <div>
                        <div className={classes.description}>
                            <h3>Description</h3>
                            <p>Use <code>ForOf</code> to iterate over Arrays to generate a list of
                                elements. Can be configured to use different types of keys: index,
                                object property and a computed value.</p>
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
                                            Factory for JSX.Element to be rendered. This function will be called with the iteration object with the <code>ForOfIteration&lt;T&gt;</code> shape.
                                        </td>
                                    </tr>
                                    <tr>
                                        <td><code>keyAttribute</code></td>
                                        <td></td>
                                        <td>
                                            The attribute to be used as key or a factory (invoked with <code>ForOfIteration&lt;T&gt;</code>) to generate a value. If not set, will cause the React warning about keys. You can return the index provided on the iteration object as a fallback in case no other value is acceptable.
                                        </td>
                                    </tr>
                                    <tr>
                                        <td><code>useIndexAsKey</code></td>
                                        <td><code>false</code></td>
                                        <td>
                                            Flag that indicates to use the array index as key.
                                        </td>
                                    </tr>
                                    <tr>
                                        <td><code>useItselfAsKey</code></td>
                                        <td><code>false</code></td>
                                        <td>
                                            Flag that indicates to use the iteration "item" as key. Only use this if the item is a primitive.
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className={classes.props}>
                            <h3>Classes and Interfaces</h3>
                            <h4><code>ForOfIteration&lt;T&gt;</code></h4>
                            <ul>
                                <li>Type params:
                                    <ul>
                                        <li><code>T</code> - The type of each <code>item</code> in the iteration</li>
                                    </ul>
                                </li>
                                <li>Properties:
                                    <ul>
                                        <li><code>item: T</code> - The item in the current loop iteration.</li>
                                        <li><code>index: number</code> - The index position of the item.</li>
                                        <li><code>length: number</code> - The length of the array being iterated.</li>
                                        <li><code>isOdd: number</code> - If the index is odd.</li>
                                        <li><code>isEven: number</code> - If the index is even.</li>
                                        <li><code>isFirst: boolean</code> - If the index is the last position of the array.</li>
                                        <li><code>isLast: boolean</code> - If the index is the first position of the array.</li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                        <div className={classes.example}>
                            <h3>Example 1</h3>
                            <div>
                                <p>Itself as key.
                                    Array: {JSON.stringify(['One', 'Two', 'Tree'], null, 2)}</p>
                                <ForOf
                                    items={['One', 'Two', 'Tree']}
                                    useItselfAsKey={true}>
                                    {iteration => (
                                        <div>
                                            {iteration.item} | Index {iteration.index} | Length {iteration.length} | Is
                                            Odd? {String(iteration.isOdd)} | Is Even {String(iteration.isEven)} | Is
                                            First? {String(iteration.isFirst)} | Is Last {String(iteration.isLast)}
                                        </div>
                                    )}
                                </ForOf>
                            </div>
                            <Highlighter>{forOfExampleCode1}</Highlighter>
                            <br/>
                            <h3>Example 2</h3>
                            <div>
                                <p>Object attribute as key. Array: {JSON.stringify([{
                                    id: 1,
                                    value: 'One'
                                }, { id: 2, value: 'Two' }, { id: 3, value: 'Tree' }], null, 2)}</p>
                                <ForOf
                                    items={[{ id: 1, value: 'One' }, { id: 2, value: 'Two' }, {
                                        id: 3,
                                        value: 'Tree'
                                    }]}
                                    keyAttribute={'id'}>
                                    {iteration => (
                                        <div>
                                            {JSON.stringify(iteration.item)} | Index {iteration.index} |
                                            Length {iteration.length} |
                                            Is Odd? {String(iteration.isOdd)} | Is Even {String(iteration.isEven)} | Is
                                            First? {String(iteration.isFirst)} | Is Last {String(iteration.isLast)}
                                        </div>
                                    )}
                                </ForOf>
                            </div>
                            <Highlighter>{forOfExampleCode2}</Highlighter>
                            <br/>
                            <h3>Example 3</h3>
                            <div>
                                <p>Factory as key. Array: {JSON.stringify([{ id: 1, value: 'One' }, { id: 2, value: 'Two' }, { id: 3, value: null }], null, 2)}</p>
                                <ForOf
                                    items={[{ id: 1, value: 'One' }, { id: 2, value: 'Two' }, { id: 3, value: null }]}
                                    keyAttribute={({item, index}) => item.value ?? index}>
                                    {iteration => (
                                        <div>
                                            {JSON.stringify(iteration.item)} | Index {iteration.index} |
                                            Length {iteration.length} |
                                            Is Odd? {String(iteration.isOdd)} | Is Even {String(iteration.isEven)} | Is
                                            First? {String(iteration.isFirst)} | Is Last {String(iteration.isLast)}
                                        </div>
                                    )}
                                </ForOf>
                            </div>
                            <Highlighter>{forOfExampleCode3}</Highlighter>
                        </div>
                    </div>
                </article>
                <article>
                    <header className={classes.articleHeader}>
                        <h2>classList (Helper)</h2>
                    </header>
                    <div>
                        <div className={classes.description}>
                            <h3>Description</h3>
                            <p>Helper function to compile list of classes, give it be a string or a map to apply classes
                                conditionally.
                            </p>
                        </div>
                        <div className={classes.props}>
                            <h3>Signature</h3>
                            <code>function classList(...classes: Array&lt;string | ClassMap&gt;): string;</code>
                        </div>
                        <div className={classes.props}>
                            <h3>Classes and Interfaces</h3>
                            <h4><code>ClassMap</code></h4>
                            <p>A hash where each key is the name of the class and the value is a boolean expression that when
                                <code>true</code> indicates to apply the class and <code>false</code> to remove.</p>
                        </div>
                        <div className={classes.example}>
                            <h3>Example</h3>
                            <div>
                                <select
                                    onChange={event => setClassListOption(event.target.value)}>
                                    <option value="">- None -</option>
                                    <option value="red">Red</option>
                                    <option value="green">Green</option>
                                    <option value="blue">Blue</option>
                                    <option value="global">Global</option>
                                </select>

                                <br/>
                                {/*Each param can be a string or a map*/}
                                <p className={classList(
                                    classes.baseClass,
                                    {
                                        [classes.class1]: classListOption === 'red',
                                        [classes.class2]: classListOption === 'green',
                                        [classes.class3]: classListOption === 'blue',
                                        'global-css': classListOption === 'global'
                                    })}>
                                  Dynamically colored text using css classes with css modules
                                </p>
                            </div>
                            <Highlighter>{classListExample}</Highlighter>
                        </div>
                    </div>
                </article>
            </div>
        </div>
    );
}

export default App;
