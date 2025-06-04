# `Attach` 组件

`Attach` 是一个用于将子组件挂载到指定 DOM 元素的渲染组件，适用于实现浮层、弹窗、Tooltip 等场景。它支持动态控制挂载目标、是否禁用挂载，以及是否延迟挂载。

## Props

| 属性名        | 类型                    | 默认值         | 说明                                             |
| ---------- | --------------------- | ----------- | ---------------------------------------------- |
| `to`       | `string` \| `Element` | `undefined` | 指定挂载的目标元素。可以是一个 CSS 选择器字符串或一个 DOM 元素等。          |
| `disabled` | `Reactive<boolean>`   | `false`     | 是否禁用挂载到 `to` 指定的目标，若为 true，则挂载在默认位置。 |
| `defer`    | `Reactive<boolean>`   | `false`     | 是否延迟挂载。为 true 时不会立即挂载，直到变为 false。              |

## 示例用法

### 示例 1：将子元素挂载到页面中的某个元素中

```ts
<Attach to="#portal-target">
  {() => <TooltipContent />}
</Attach>
```

> 如果页面中存在 `id="portal-target"` 的元素，`TooltipContent` 会被挂载到该元素中。

### 示例 2：禁用挂载，保持原位置渲染

```ts
<Attach to="#modal-root" disabled={ref(true)}>
  {() => <MyModal />}
</Attach>
```

> 设置 `disabled` 为 `true`，组件将不会挂载到 `#modal-root`，而是渲染在当前节点位置。

### 示例 3：延迟挂载（例如在首次打开弹窗时才挂载）

```ts
const defer = ref(true);

// 在某个事件后手动取消延迟
setTimeout(() => {
  defer.setValue(false);
}, 1000);

<Attach to="#lazy-target" defer={defer}>
  {() => <LazyPortal />}
</Attach>
```

## 内部逻辑说明

* `Attach` 组件不会立即挂载子组件，除非满足以下条件：

  * `defer` 不为 `true`；
  * 若 `disabled` 为 `true`，挂载在 fallback 的原始位置；
  * 否则挂载到 `to` 指定的目标元素；
* 使用 `watch` 监听 `disabled` 和 `defer` 的值变化，动态调整挂载逻辑；
* 提供 `mount` / `update` / `destroy` 生命周期方法，供渲染系统调用。

## 注意事项

* `to` 若传入无效选择器或不存在的元素，将不会挂载；
* 若 `children` 返回值为空，则不会执行挂载逻辑；
* `Attach` 是低层能力组件，应结合应用场景封装更具语义的 UI 组件（如 Dialog、Popover 等）使用。
