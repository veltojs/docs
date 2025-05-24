# 快速开始
本指南将引导你从零开始创建并运行一个 Velto 应用，你可以快速的搭建好开发环境，适用于初学者和有经验的开发者。

## 创建 Velto 应用

在当前工作目录创建项目。终端中运行以下命令 (不要带上 $ 符号)：

::: code-group

```sh [npm]
$ npm create velto@latest
```

```sh [pnpm]
$ pnpm create velto
```

```sh [yarn]
$ yarn create velto
```

```sh [bun]
$ bun create velto
```

:::

上述命令将启动一个交互式向导，提示你输入项目名称、选择模板（JavaScript 或 TypeScript），并确认是否覆盖已存在的目录。

```sh [pnpm]
pnpm create velto
? Project name: <你的应用名称>
? The directory already exists, is it overwritten? (y/N) // 如果文件夹已经存在，将会提示
? Select a template:  (Use arrow keys) // 选择创建 Javascript 或 Typescript 应用
❯ velto
  velto-ts

../Library/pnpm/store/v3/tmp/dlx-19226   |  +47 +++++
../Library/pnpm/store/v3/tmp/dlx-19226   | Progress: resolved 47, reused 47, downloaded 0, added 47, done
✔ Project name:  my-app
✔ The directory already exists, is it overwritten? Yes
✔ Select a template:  velto
```

## 启动开发服务器
项目创建完成后，按照以下步骤启动开发服务器：

```
cd my-app 
pnpm install 
pnpm run dev 
```
默认情况下，开发服务器将在 http://localhost:5173 启动。你可以在浏览器中访问该地址，查看应用运行情况。

## 项目结构概览
```
my-app/
├── public/            # 静态资源目录
├── src/               # 源代码目录
│   ├── components     # 应用组件目录
│   ├── App.jsx        # 应用主组件
│   └── main.jsx       # 应用入口文件
├── index.html         # HTML 模板
├── package.json       # 项目信息及依赖配置
└── vite.config.js     # Vite 配置文件
```
你可以根据需要自定义项目结构和配置，以适应不同的开发需求。