# Velto 生命周期指南

Velto 提供了一组丰富的生命周期钩子，允许你在组件的不同阶段执行逻辑。以下文档详细介绍了所有生命周期钩子、它们的触发时机、典型应用场景，以及使用方式。

## 生命周期一览

| 生命周期钩子          | 触发时机               | 常见用途            |
| --------------- | ------------------ | --------------- |
| `created`       | 组件实例创建后，尚未挂载 DOM   | 初始化状态、注册副作用     |
| `beforeMount`   | 渲染函数即将首次执行前        | 准备 DOM 渲染前的逻辑   |
| `mounted`       | 组件已挂载到 DOM         | 获取 DOM 引用、启动定时器 |
| `beforeUpdate`  | 响应式依赖即将变化，组件即将更新   | 保存状态快照、节流更新等优化  |
| `updated`       | 组件响应式更新已完成，DOM 已更新 | DOM 操作、状态同步     |
| `beforeDestroy` | 组件即将被卸载            | 停止副作用、清理监听器     |
| `destroyed`     | 组件已完全卸载，清理完成       | 日志记录、断开连接等      |


## 注册生命周期钩子

Velto 提供函数形式的钩子注册 API：

```ts
import {
  onCreated,
  onBeforeMount,
  onMounted,
  onBeforeUpdate,
  onUpdated,
  onBeforeDestroy,
  onDestroyed,
} from '@velto/runtime';

export function App() {
  onCreated(() => {
    console.log('组件已创建');
  });

  onMounted(() => {
    console.log('已挂载');
  });

  onDestroyed(() => {
    console.log('已销毁');
  });

  return () => <div>Hello Velto</div>;
}
```

## 生命周期图示

```text
┌──────────────┐
│   created    │
└─────┬────────┘
      ↓
┌──────────────┐
│ beforeMount  │
└─────┬────────┘
      ↓
┌──────────────┐
│   mounted    │
└─────┬────────┘
      ↓
┌──────────────┐
│beforeUpdate  │────┐
└─────┬────────┘    │（每次响应式变更后循环）
      ↓             │
┌──────────────┐    │
│   updated    │◄───┘
└─────┬────────┘
      ↓
┌──────────────┐
│beforeDestroy │
└─────┬────────┘
      ↓
┌──────────────┐
│  destroyed   │
└──────────────┘
```

## 每个生命周期详解

### `onCreated`

组件创建后立即调用（尚未挂载 DOM）。适合进行状态初始化或注册副作用。

```ts
onCreated(() => {
  console.log('组件已创建，但还未挂载');
});
```

### `onBeforeMount`

组件首次渲染前调用，可用于渲染前的准备逻辑。

```ts
onBeforeMount(() => {
  console.log('组件即将挂载');
});
```

### `onMounted`

组件挂载到真实 DOM 后调用，常用于操作 DOM、请求数据。

```ts
onMounted(() => {
  console.log('组件已挂载到页面');
});
```

### `onBeforeUpdate`

当响应式数据变更，组件即将重新渲染时触发。

```ts
onBeforeUpdate(() => {
  console.log('组件即将更新');
});
```

### `onUpdated`

组件完成更新并应用到 DOM 后调用。

```ts
onUpdated(() => {
  console.log('组件已更新');
});
```

### `onBeforeDestroy`

组件被卸载前调用。适合清理副作用（如事件监听、定时器等）。

```ts
onBeforeDestroy(() => {
  console.log('组件即将被销毁');
});
```

### `onDestroyed`

组件被完全移除，所有资源清理完成时调用。

```ts
onDestroyed(() => {
  console.log('组件已销毁');
});
```

## 示例：完整生命周期日志

```ts
export function LoggerComponent() {
  onCreated(() => console.log('[生命周期] created'));
  onBeforeMount(() => console.log('[生命周期] beforeMount'));
  onMounted(() => console.log('[生命周期] mounted'));
  onBeforeUpdate(() => console.log('[生命周期] beforeUpdate'));
  onUpdated(() => console.log('[生命周期] updated'));
  onBeforeDestroy(() => console.log('[生命周期] beforeDestroy'));
  onDestroyed(() => console.log('[生命周期] destroyed'));

  return () => <div>生命周期组件</div>;
}
```

## 注意事项

* 所有生命周期钩子必须在组件函数顶层调用。
* 每个生命周期钩子允许注册多个回调，按注册顺序执行。
* Velto 不支持选项式 API，所有钩子以函数形式声明。

## 对比 Vue 生命周期

| Vue             | Velto               |
| --------------- | ------------------- |
| `created`       | ✅ `onCreated`       |
| `beforeMount`   | ✅ `onBeforeMount`   |
| `mounted`       | ✅ `onMounted`       |
| `beforeUpdate`  | ✅ `onBeforeUpdate`  |
| `updated`       | ✅ `onUpdated`       |
| `beforeUnmount` | ✅ `onBeforeDestroy` |
| `unmounted`     | ✅ `onDestroyed`     |

