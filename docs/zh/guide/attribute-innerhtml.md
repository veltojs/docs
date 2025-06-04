# `innerHTML` 

`innerHTML` 是一种属性配置方式，用于直接设置元素的 HTML 内容，适用于静态或动态 HTML 字符串的插入。

## 适用场景

* 快速插入一段 HTML 字符串
* 渲染内容中包含多个子元素、文本混排等复杂结构
* 使用从后端获取的内容片段进行渲染（确保安全性）

## 用法示例

```ts
<div innerHTML="<strong>Hello</strong> <em>World</em>"></div>
```

渲染效果：

```html
<div><strong>Hello</strong> <em>World</em></div>
```

## 行为说明

* 使用 `innerHTML` 会覆盖元素现有的所有内容。
* 每次 `update` 时，如果传入的新 `innerHTML` 与旧值不同，会重新设置 HTML 内容。

## 注意事项

* **不要将不可信内容**（如用户输入）直接传给 `innerHTML`，防止 XSS 攻击。

## 推荐用法 vs 不推荐用法

| 类型      | 用法示例                                                     | 是否推荐    |
| ------- | -------------------------------------------------------- | ------- |
| 文本 + 标签 | `innerHTML: "<b>Hi</b> there!"`                          | ✅       |
| 用户输入    | `innerHTML: userInput`（无清洗处理）                            | 🚫      |
| 动态内容    | `innerHTML: contentHtml`（由后端提供的、可信来源的内容）                 | ✅\*（谨慎） |
| 带交互组件   | `innerHTML: "<button onclick='alert(1)'>Click</button>"` | 🚫      |

## 安全使用建议

### 1. **对内容进行清洗（Sanitize）**

如果你必须插入动态 HTML，务必在使用前清洗内容。推荐使用 [DOMPurify](https://github.com/cure53/DOMPurify)：

##### 安装 DOMPurify

```bash
npm install dompurify
```

##### 用法示例：

```ts
import { ref, computed } from '@velto/runtime'
import DOMPurify from 'dompurify'

const rawHtml = ref('<img src=x onerror=alert(1)>Hello <b>World</b>')

// 清洗后的 HTML
const safeHtml = computed(() => DOMPurify.sanitize(rawHtml.value))

// html
<div innerHTML={safeHtml}></div>
```
