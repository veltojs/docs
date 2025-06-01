# 插槽 (Slot)

Velto 中的组件支持通过显式传入 `children` 参数来自定义内容区域。插槽是一种内容占位机制，允许使用者将任意结构插入到组件内部的指定位置。

## 基本概念

Velto 的插槽是通过组件参数中的 `children` 字段传入的结构内容。在组件内部，你可以将 `children` 渲染到你想要的位置。

## 基本用法

### 组件定义：

```ts
export function Box(props: { children?: any }) {
  return (
    <div>
      {props.children}
    </div>
  );
}
```

### 组件使用：

```ts
<Box>
  <p>我是被插入的内容</p>
</Box>
```

> 这段内容将被渲染在 `Box` 组件的 `children` 位置。

## 插槽更新行为

如果插入的内容是响应式的，插槽区域会自动更新：

```ts
const message = ref("你好 Velto");

<Box>
  <p>{message.value}</p>
</Box>

// 后续更新 message.value 会自动更新插槽内容
```

## 插槽是参数

Velto 插槽不是模板语法的特殊语法，它只是一个普通的参数（通常是结构或函数），你可以自由控制是否渲染、如何渲染：

```ts
function Panel(props: { title: string; children?: any }) {
  return (
    <div>
      <h2>{props.title}</h2>
      {props.children && <div>{props.children}</div>}
    </div>
  );
}
```
## 插槽设计建议

* 插槽是组件开放的结构插入接口，适合用于包裹容器、布局类组件；
* 插槽不是模板变量，也不是特殊语法，仅是参数；
* 插槽建议具备明确结构边界，例如 `Panel` 的内容、`List` 的每一项等；

## 示例：组合插槽组件

```ts
function Modal(props: { title: string; children?: any }) {
  return (
    <div class="modal">
      <div class="modal-header">{props.title}</div>
      <div class="modal-body">{props.children}</div>
    </div>
  );
}

// 使用
<Modal title="系统提示">
  <p>操作成功！</p>
</Modal>
```
