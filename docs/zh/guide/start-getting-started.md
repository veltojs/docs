# 快速开始
通过本教程，你可以快速的搭建好开发环境。

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

这个命令将会引导安装 velto 应用。

```sh [pnpm]
? Project name: <你的应用名称>
? The directory already exists, is it overwritten? (y/N) // 如果文件夹已经存在，将会提示
? Select a template:  (Use arrow keys) // 选择创建 Javascript 或 Typescript 应用
❯ velto
  velto-ts
```

创建成功。按照如下提示即可启动应用进行开发。

```
pnpm create velto
../Library/pnpm/store/v3/tmp/dlx-19226   |  +47 +++++
../Library/pnpm/store/v3/tmp/dlx-19226   | Progress: resolved 47, reused 47, downloaded 0, added 47, done
✔ Project name:  my-app
✔ The directory already exists, is it overwritten? Yes
✔ Select a template:  velto
Done. Now run:  

cd my-app 
pnpm install 
pnpm run dev 
```