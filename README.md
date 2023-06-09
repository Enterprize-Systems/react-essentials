# react-essentials

> Provides essential structural components like IF, SWITCH and FOROF and helpers such as classList for declarative code.

[![NPM](https://img.shields.io/npm/v/react-essentials.svg)](https://www.npmjs.com/package/react-essentials) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install @enterprize/react-essentials
```

## Usage

### If (Structural)

#### Description
Conditionally renders its children. Accepts an optional else element to be shown. The children can 
be a factory, so it properly prevents React from parsing the children and causing code that relies 
on values that can be undefined/null to throw exceptions.

#### Props
Props marked with * are required.

| Prop | Default | Description |
|---|---|---|
| ``expression`` * |   | Expression to conditionally show the children. If ``true`` shows the children, otherwise if ``else`` is defined, will show its element, otherwise will not render anything. |
| ``else`` |   | The "else" of the "if..else" statement. JSX.Element to show when the ``expression`` results in ``false``. |

#### Example
```typescript jsx
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
        <br/>
        
        {/*The else can also be a factories to prevent React from processing the JSX.*/}
        {/*Otherwise safe navigation must always be used if something might be null/undefined.*/}
        <If
            expression={ifExampleShow}
            else={<>I am the else. {ifExampleOuter?.message}</>}>
            I am displayed!
        </If>
    </div>
);
```

---

### Switch (Structural)

#### Description

Use ``Switch`` to dynamically show or hide pieces of JSX using a ``switch..case..default`` approach. 
Use ``SwitchCase`` as ``case`` statement and optionally ``SwitchCaseDefault`` for ``default``
statement. The  children of ``SwitchCase`` and ``SwitchCaseDefault`` can be a factory, similar to 
``If``.

#### Props

Props marked with * are required.

| Prop | Default | Description |
|---|---|---|
| ``expression`` * | | Expression to evaluate. Can be any value. This value will be compared on each ``SwitchCase`` block and if matches will display the assigned content. If none matches and a ``SwitchCaseDefault`` is set, will display its contents instead. `` |
| children | | List of ``SwitchCase`` or ``SwitchCaseDefault`` child/children. |

#### Example
````typescript jsx
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
````

### ForOf (Structural)

#### Description

Use ``ForOf`` to iterate over Arrays to generate a list of elements. Can be configured to use different types of keys: index, object property and a computed value.

#### Props
Props marked with * are required.

| Prop | Default | Description |
|---|---|---|
| ``items`` *    | | List of item to iterate. |
| ``children`` * | | Factory for JSX.Element to be rendered. This function will be called with the iteration object with the ``ForOfIteration<T>`` shape. |
| ``keyAttribute`` | | The attribute to be used as key or a factory (invoked with ``ForOfIteration<T>``) to generate a value. If not set, will cause the React warning about keys. You can return the index provided on the iteration object as a fallback in case no other value is acceptable. |
| ``useIndexAsKey`` | ``false`` | Flag that indicates to use the array index as key. |
| ``useItselfAsKey`` | ``false`` | Flag that indicates to use the iteration "item" as key. Only use this if the item is a primitive. |

#### Classes and Interfaces 

##### ``ForOfIteration<T>``

- Type params:
  - ``T`` - The type of each ``item`` in the iteration
- Properties:
  - ``item: T`` - The item in the current loop iteration.
  - ``index: number`` - The index position of the item.
  - ``length: number`` - The length of the array being iterated. 
  - ``isOdd: number`` - If the index is odd.
  - ``isEven: number`` - If the index is even. 
  - ``isFirst: boolean`` - If the index is the last position of the array. 
  - ``isLast: boolean`` - If the index is the first position of the array.

#### Example 1:

````typescript jsx
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
````

#### Example 2:

````typescript jsx
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
````

#### Example 3:

````typescript jsx
const items = [
  { id: 1, value: 'One' },
  { id: 1, value: 'Two' }, 
  { id: 3, value: 'Tree'}
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
````

### classList (Helper)

#### Description

Helper function to compile list of classes, give it be a string or a map to apply classes
conditionally.

#### Signature
``function classList(...classes: Array<string | ClassMap>): string;``

#### Classes and Interfaces
##### ``ClassMap``
A hash where each key is the name of the class and the value is a boolean expression that when 
``true`` indicates to apply the class and ``false`` to remove.

#### Example
````typescript jsx
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
````

## Running the Playground

Clone the project and run:
```bash
cd lib
pnpm install
pnpm run build

cd ../playground
pnpm run dev
```

## License

MIT © [Enterprize Systems](https://github.com/Enterprize-Systems)
