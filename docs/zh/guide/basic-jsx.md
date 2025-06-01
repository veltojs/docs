
# JSX 基本使用

JSX（JavaScript XML）是 Velto 推荐的声明式语法，用于描述 UI 界面结构。它在外观上类似 HTML，但本质上是 JavaScript 的语法扩展，在构建组件时提供了强大的表达能力。

## JSX 是什么？

JSX 会被 Velto 编译为 Javascript 语法的调用，例如：

```jsx
const element = <h1>Hello, world!</h1>;
```

等价于：

```js
const element = _markRender(() => {
  const _element = element("h1", {});
  const _text = text("Hello, world!");
  return {
    mount(target, anchor) {
      _element.mount(target, anchor);
      append(_element.el, _text);
    },
    update() {},
    destroy() {
      _element.destroy();
      remove(_text);
    }
  };
});
```

## JSX 中的基本类型支持

JSX 中可以嵌入多种 JavaScript 基本类型，这些类型在渲染时会根据特性做出不同处理。

### 1. 字符串（String）与数字（Number）

```jsx
const name = 'Alice';
const age = 25;

const element = <p>{name} is {age} years old.</p>;
```

### 2. 布尔值（Boolean）、null 与 undefined

这些值在渲染时会过滤掉，不会渲染在页面上。
```jsx
const isAdmin = true;

const element = (
  <div>
    <p>Hello User</p>
    {isAdmin && <p>Welcome Admin</p>}
  </div>
);
```

### 3. 数组（Array）

```jsx
const fruits = ['Apple', 'Banana', 'Orange'];

const list = (
  <ul>
    {fruits.map(fruit => <li key={fruit}>{fruit}</li>)}
  </ul>
);
```

### 4. 函数返回的 JSX（Function Return）

```jsx
function Greeting(name) {
  return <h2>Hello, {name}!</h2>;
}

const element = Greeting('Bob');
```

### 5. 条件渲染（Conditional Rendering）

```jsx
const isLoggedIn = true;

const element = (
  <div>
    {isLoggedIn ? <p>Welcome</p> : <p>Please log in</p>}
  </div>
);
```

### 6. 样式（Style）

```jsx
const style = {
  color: 'blue',
  fontSize: '20px',
  backgroundColor: '#eee'
};

const element = <p style={style}>Styled Text</p>;
```

### 7. 类名（class）

```jsx
const element = <div class="container">Hello</div>;
```

### 8. 事件处理

```jsx
function handleClick() {
  alert('Button clicked');
}

const element = <button onClick={handleClick}>Click Me</button>;
```

## 进阶类型支持

### 1. Fragment

```jsx
<>
  <h1>Title</h1>
  <p>Description</p>
</>
```

### 2. JSX 中的表达式 vs 语句

```jsx
{show ? <p>Visible</p> : null}
```

### 3. 属性传递与展开（Props Spread）

```jsx
const props = {
  className: 'title',
  style: { color: 'red' }
};

const element = <h1 {...props}>Hello</h1>;
```

### 4. 使用驼峰式命名法给一般属性命名！ 
JSX 最终会被转化为 JavaScript，而 JSX 中的属性也会变成 JavaScript 对象中的键值对。在你自己的组件中，经常会遇到需要用变量的方式读取这些属性的时候。但 JavaScript 对变量的命名有限制。所以属性名称一般使用驼峰式命名法。

```jsx
// onClick 属性 为
const element = <button onClick={handleClick}>Click Me</button>;
```

## 完整示例

```jsx
function ProfileCard({ user }) {
  const { name, age, hobbies, isOnline } = user;

  return (
    <div style={{ padding: 10, border: '1px solid #ccc' }}>
      <h2>{name}</h2>
      <p>Age: {age}</p>
      {isOnline && <p style={{ color: 'green' }}>● Online</p>}
      <ul>
        {hobbies.map(hobby => <li>{hobby}</li>)}
      </ul>
    </div>
  );
}
```

## 结语

JSX 是 Velto 的核心语法结构之一，掌握其基本类型及渲染机制，是构建高质量组件的基础。理解其行为、限制与用法可以大幅提升开发效率与代码质量。
