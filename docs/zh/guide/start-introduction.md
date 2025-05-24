
# Velto 简介

**Velto** 是一个没有虚拟 DOM 的 Web 框架，旨在构建无需虚拟 DOM 的响应式用户界面。

## 项目特点

* **无虚拟 DOM**：Velto 采用直接操作真实 DOM 的方式，避免了虚拟 DOM 的中间层，提高了性能和响应速度。

* **响应式系统**：内置轻量级响应式系统，包括 `ref`、`computed` 和 `watch` 等功能，允许开发者以声明式的方式处理状态变化。

* **模块化设计**：项目结构清晰，代码模块化，便于维护和扩展。

## 项目结构

Velto 仓库主要包含以下目录和文件：

* `packages/`：核心功能模块，包括响应式系统的实现。

* `examples/`：示例代码，展示如何使用 Velto 构建应用。

* `scripts/`：构建和开发脚本。

* 配置文件：包括 `tsconfig.json`、`package.json` 等，用于项目配置和依赖管理。

##  核心功能

1. `ref`

用于创建响应式数据对象。通过 `.value` 访问和修改其值，系统会自动追踪依赖并在值变化时触发更新。

2. `computed`

用于创建基于其他响应式数据的派生值。支持只读和可写两种模式，具有缓存特性，只有在依赖变化时才重新计算。

3. `watch`

用于监听响应式数据的变化，并在变化时执行回调函数。支持配置选项，如 `immediate` 和 `once`，控制回调的触发时机和次数。

## 示例

以下是使用 Velto 构建简单计数器的示例：

```typescript
import { ref, computed, watch } from 'velto';

const count = ref(0);
const double = computed(() => count.value * 2);

watch(count, (newVal, oldVal) => {
  console.log(`Count changed from ${oldVal} to ${newVal}`);
});

count.value = 1;
console.log(double.value); // 输出: 2
```



## 相关资源

* GitHub 仓库：[https://github.com/zebing/velto](https://github.com/zebing/velto)

* 许可证：MIT
