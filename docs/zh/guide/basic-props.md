# 组件 Props 使用

Velto 支持通过函数组件传参的方式接收 Props（属性），风格类似 React。你可以使用 TypeScript 进行类型标注，以获得完整的类型推导与开发体验。

## 响应式参数

Velto 的 props 本身不是响应式的，但你可以通过传递响应式值来驱动子组件更新。
若希望子组件在父组件参数变化时自动更新，需显式传入响应式参数（如 `ref` 或 `computed` 包装的值）。

```ts
// ❌ 不会更新
function Parent() {
  const count = 0;

  return <Child value={count} />;
}

function Child({ value }: { value: number }) {
  return <div>{value}</div>; // 不会随着 count 的变化而更新
}
```

为使组件具备响应式响应行为：

```ts
// ✅ 正确：传递响应式 ref
import { ref } from '@velto/core';

function Parent() {
  const count = ref(0);

  // 模拟更新
  setTimeout(() => {
    count.setValue(count.value++);
  }, 2000);

  return <Child value={count} />;
}

function Child({ value }: { value: { value: number } }) {
  return <div>{value.value}</div>; // 随着 count.value 的变化而更新
}
```

**推荐做法**

如果你希望子组件接收的值具有响应式更新行为，请遵循以下原则：

* 在父组件中使用 `ref` 包装；
* 子组件中读取 `.value`；
* 如果不想暴露 `.value`，可在子组件中使用 `computed` 或 `watch` 解包。

```ts
// 更优写法：在子组件中用 computed 解包
import { computed } from '@velto/core';

function Child({ value }: { value: { value: number } }) {
  const actualValue = computed(() => value.value);

  return <div>{actualValue.value}</div>;
}
```

## 基本用法

组件通过函数参数接收 Props：

```ts
export function Hello(props: { name: string }) {
  return <div>Hello, {props.name}!</div>;
}
```

使用组件时：

```tsx
<Hello name="Velto" />
```

##  使用解构

为了简洁，可以直接解构 Props：

```ts
export function Hello({ name }: { name: string }) {
  return <div>Hello, {name}!</div>;
}
```


## 定义 Props 类型

建议将 Props 类型抽出定义，提升复用性和可读性：

```ts
interface HelloProps {
  name: string;
  age?: number;
}

export function Hello({ name, age }: HelloProps) {
  return (
    <div>
      <p>Name: {name}</p>
      {age !== undefined && <p>Age: {age}</p>}
    </div>
  );
}
```

## 支持默认值

Velto 不提供“选项式默认 Props”，但你可以通过参数默认值或逻辑处理实现：

```ts
export function Button({ label = '默认按钮' }: { label?: string }) {
  return <button>{label}</button>;
}
```

或者：

```ts
export function Button(props: { label?: string }) {
  const label = props.label ?? '默认按钮';
  return <button>{label}</button>;
}
```

## 示例：组合多个 Props

```ts
type CardProps = {
  title: string;
  description?: string;
  onClick?: () => void;
};

export function Card({ title, description, onClick }: CardProps) {
  return (
    <div onClick={onClick} >
      <h2>{title}</h2>
      {description && <p>{description}</p>}
    </div>
  );
}
```

使用方式：

```tsx
<Card
  title="Velto 组件系统"
  description="这是一个可复用组件"
  onClick={() => alert('Clicked!')}
/>
```

## 注意事项

* **Props 是只读的**，不要直接修改它们。
* 请使用 TypeScript 明确 Props 类型，提高代码质量。

## 配合响应式使用

如果你希望接收到的 prop 是响应式的，请结合 `ref` 或 `computed` 使用（如在父组件中包裹为响应式值）。

```ts
const name = ref('Velto');

<App name={name.value} />
```
