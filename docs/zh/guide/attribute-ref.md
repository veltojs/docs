# 节点引用（`ref`）

在 Velto 中，你可以通过 `ref` 属性将 DOM 元素或组件实例绑定到响应式引用上。它是一种获取模板中 DOM 节点的方式，常用于直接操作 DOM、聚焦输入框、测量元素尺寸等场景。

## 基础用法

你可以使用 `ref` 将一个 DOM 元素绑定到一个响应式引用上：

```ts
import { ref, onMounted } from '@velto/core';

export function App() {
  const inputRef = ref<HTMLInputElement | null>(null);

  onMounted(() => {
    inputRef.value?.focus(); // 获取焦点
  });

  return () => (
    <input ref={inputRef} placeholder="自动聚焦输入框" />
  );
}
```

## 工作原理

Velto 中的 `ref` 会在渲染阶段，将对应的 DOM 元素赋值给传入的 `ref` 对象的 `.value`。你可以在组件生命周期中（如 `onMounted`）访问这个节点。

## 类型提示

你可以通过泛型为 `ref` 指定元素类型，例如：

```ts
const divRef = ref<HTMLDivElement | null>(null);
```

这样在使用 `divRef.value` 时可以获得类型提示和自动补全。

## 与组件引用

与 DOM 节点的引用。对组件实例的引用将拿到组件的实例。
```ts
import { ref, onMounted } from '@velto/core';

export function App() {
  const compRef = ref<HTMLInputElement | null>(null);

  onMounted(() => {
    compRef.value; // 组件实例
  });

  return () => (
    <Test ref={compRef} />
  );
}
```

## 使用建议

* **推荐在 `onMounted` 生命周期中访问 DOM**，确保 DOM 已经插入文档。
* 如果在响应式副作用中访问 `.value`，请确保引用已初始化。

## 示例：滚动容器到底部

```ts
import { ref, onMounted } from '@velto/core';

export function ChatBox() {
  const boxRef = ref<HTMLDivElement | null>(null);

  onMounted(() => {
    boxRef.value?.scrollTo({ top: 9999 });
  });

  return () => (
    <div ref={boxRef} style={{ height: '300px', overflow: 'auto' }}>
      {/* 聊天内容 */}
    </div>
  );
}
```
