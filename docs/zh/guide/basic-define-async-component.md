# defineAsyncComponent

`defineAsyncComponent` 是 Velto 提供的一个工具函数，用于**按需异步加载组件**。这对于延迟加载大型模块、优化初始加载时间以及错误处理非常有用。

## 特性

* 支持异步组件加载（基于 Promise）
* 支持加载中组件（`loadingComponent`）
* 支持错误处理组件（`errorComponent`）
* 支持超时控制与重试

## 函数签名

```ts
function defineAsyncComponent(
  loader: () => Promise<Component>
): Component;

function defineAsyncComponent(options: {
  loader: () => Promise<Component>,
  loadingComponent?: Component,
  errorComponent?: Component<ErrorComponentProps>,
  timeout?: number,
}): Component;
```

## `AsyncComponentOptions` 参数说明

| 选项名                | 类型                               | 说明                                             |
| ------------------ | -------------------------------- | ---------------------------------------------- |
| `loader`           | `() => Promise<Component>`       | 异步组件加载器，返回一个组件或 `{ default: Component }` 格式的模块 |
| `loadingComponent` | `Component`                      | 加载期间显示的组件（可选）                                  |
| `errorComponent`   | `Component<ErrorComponentProps>` | 加载失败时显示的组件（可选）                                 |
| `timeout`          | `number`                         | 超时时间（毫秒），超时视为失败（可选）                            |

## 基础异步加载

```ts
import { defineAsyncComponent } from 'velto';

const AsyncPage = defineAsyncComponent(() =>
  import('./pages/HeavyComponent.js')
);
```

## 带加载和错误组件

```ts
const AsyncPage = defineAsyncComponent({
  loader: () => import('./pages/HeavyComponent.js'),
  loadingComponent: (props) => (<div> {props.name} loading</div>),
  errorComponent: (props) => (<div> {props.name} error</div>),
  timeout: 5000,
});
```

## 内部实现机制简要说明

* **异步加载机制**：

  * 调用 `loader()` 返回组件模块。
  * 若模块符合 ESM 规范（`default` 导出），则解构后渲染。

* **容错机制**：

  * 如果加载超时或失败，则使用 `errorComponent` 渲染错误提示，包含错误信息、重试次数和 `retry()` 方法。

* **渲染逻辑**：

  * 最初渲染 `loadingComponent`，成功后替换为目标组件，失败则渲染错误组件。
  * 每次 `mount` 时重新触发加载流程。

## 错误组件参数说明

```ts
interface ErrorComponentProps {
  props: Record<string, unknown>;
  err: Error;
  retry: () => void;
  retries: number;
}
```

你可以在错误组件中提供“重试”按钮，用户可重新触发组件加载。

## 注意事项

* `defineAsyncComponent` 返回的组件必须和普通组件一样使用。
* 异步组件默认立即加载，无懒加载调度（需自实现按需挂载）。
* 错误组件不会阻止其他组件继续渲染，仅用于本次异步加载失败的替代显示。

