

# watch

## 作用

`watch` 用于监听响应式值（或计算函数）发生变化时，触发回调函数。适用于需要在值发生变更时执行副作用的场景。

## 监听单个响应式对象

```ts
import { ref, watch } from '@velto/runtime';

const count = ref(0);

watch(count, (newVal, oldVal) => {
  console.log(`count changed from ${oldVal} to ${newVal}`);
});
```

## 监听多个响应式对象

```ts
const a = ref(1);
const b = ref(2);

watch([a, b], ([newA, newB], [oldA, oldB]) => {
  console.log(`a: ${oldA} → ${newA}, b: ${oldB} → ${newB}`);
});
```

## 使用函数作为观察源

```ts
watch(() => count.value, (newVal, oldVal) => {
  console.log(`computed value changed: ${oldVal} → ${newVal}`);
});
```

## 可选配置项（第三个参数）

| 选项名         | 类型        | 默认值     | 说明                        |
| ----------- | --------- | ------- | ------------------------- |
| `immediate` | `boolean` | `false` | 是否在监听建立后立即执行回调一次          |
| `once`      | `boolean` | `false` | 是否仅在首次变化时触发一次回调，触发后自动停止监听 |

**示例**：

```ts
watch(count, (newVal, oldVal) => {
  console.log('Triggered immediately');
}, {
  immediate: true
});
```

## 控制监听器生命周期
```
  const state = ref(0);

  const handle = watch(() => state.value, (val) => {
    console.log(`Watching: ${val}`);
  });

  handle.pause();   // 暂停监听
  handle.resume();  // 恢复监听
  handle.stop();    // 停止监听（彻底销毁）
```

## 内部工作机制简析

* `watch` 将响应式值抽象为一个 `getter`；
* 使用 `Effect` 类创建副作用函数；
* 每当依赖值变化，`Effect` 的 `scheduler` 会执行，调用回调；
* `immediate: true` 会让回调在初次执行时立刻调用；
* `once: true` 会在首次触发后禁用回调。

## 注意事项

* 只能监听由 `ref` 或函数包裹的响应式值；
* 多个源时传数组，回调参数为 `[newVals, oldVals]`；
