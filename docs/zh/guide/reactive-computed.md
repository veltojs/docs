
# computed

## 作用

`computed` 创建一个**派生值**，它基于其他响应式状态计算得出，并具备缓存特性。只有当依赖变更时，`computed` 才会重新计算。

## 只读 `computed`（常见）

```ts
const count = ref(1);

const double = computed(() => count.value * 2);

console.log(double.value); // 2
```

`double` 是响应式的，当 `count.value` 改变时，`double.value` 会自动更新。


## 可写 `computed`（getter + setter）

```ts
const count = ref(1);

const double = computed({
  get: () => count.value * 2,
  set: (val) => {
    count.setValue(val / 2);
  },
});

console.log(double.value); // 2

double.setValue(10);
console.log(count.value); // 5
```

## 内部机制简析

* 调用 `computed()` 返回一个 `Computed` 实例。
* 内部通过 `Effect` 实现响应式追踪与调度：

  * 初始化时运行 getter，保存初始值。
  * 调度器 `scheduler` 会在依赖变更时重新执行 getter，并更新缓存值。
* 当访问 `.value` 时，会执行 `trackEffect` 建立依赖关系。
* 当依赖变更时，执行 `triggerEffect` 通知相关副作用重新执行。

## 特性说明

| 特性        | 支持情况   | 说明                     |
| --------- | ------ | ---------------------- |
| 缓存        | ✅      | 不依赖变化时不会重新计算           |
| 响应追踪      | ✅      | 支持 `.value` 建立依赖       |
| 支持 setter | ✅      | 可通过 `setValue()` 设置    |

## 注意事项

* `.value` 是只读访问，写入必须使用 `setValue()` 方法。
* 没有自动缓存失效控制（对 getter 内部依赖较多的情况，可能需要手动优化）。
* 不能嵌套使用 `ref.value = ...`（需使用 `setValue`）。

## 使用场景示例

```ts
const price = ref(100);
const quantity = ref(2);

const total = computed(() => price.value * quantity.value);

watch(total, (newVal) => {
  console.log('总价变化为：', newVal);
});

price.setValue(150); // 会自动触发 total 的更新和 watch 回调
```

## 总结

`computed` 是一种响应式派生值，适用于从一个或多个 `ref` 派生状态的场景。它具备缓存、追踪依赖、可读/可写的特性，并可与 `watch`、组件渲染等配合使用。

