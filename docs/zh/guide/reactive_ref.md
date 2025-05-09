

## ref

## 作用

`ref` 是 `velto` 响应式系统中创建基本响应式数据的核心函数。它将任意值包装为一个响应式对象，使得读取和修改 `.value` 会自动建立依赖并触发响应。

## 创建响应式值

```ts
const count = ref(0);

console.log(count.value); // 读取值

count.setValue(10);       // 修改值（需使用 setValue）
```

>>> 注意：在当前实现中，不能直接通过 `count.value = 10` 修改，必须使用 `setValue()` 方法。

---

## 响应行为说明

1. 读取值时

当访问 `ref.value` 时，会调用 `get value()`，并执行：

```ts
trackEffect(activeEffect, this);
```

这会注册当前活跃的副作用（如组件渲染函数、watch 回调）为依赖。

2. 设置值时

当调用 `setValue(newVal)` 时，内部会执行：

```ts
triggerEffect(this, this.dep);
```

这会触发所有依赖于该 ref 的副作用更新。


## 与 `watch` 一起使用

```ts
import { ref, watch } from '@velto/runtime';

const msg = ref('hello');

watch(msg, (newVal, oldVal) => {
  console.log(`msg changed: ${oldVal} → ${newVal}`);
});

msg.setValue('world');
```

## 注意事项

| 限制    | 描述                                                               |
| ----- | ---------------------------------------------------------------- |
| 修改方式  | 必须使用 `.setValue()` 方法来更新值，直接赋值 `.value = ...` 无效（当前实现不支持 setter） |
| 类型定义  | `ref<T>()` 会返回 `Ref<T>`，`.value` 是实际值                            |


## 内部结构分析（源码对应）

* `ref(value)` 实际创建了 `Ref` 实例；
* `Ref` 内部使用 `dep` 来存储所有依赖；
* `get value()` 建立依赖；
* `setValue()` 触发依赖更新；
* 标记 `this[ReactiveFlags.IS_REF] = true`，供外部识别是否是 `ref`。          |

