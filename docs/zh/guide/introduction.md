# 简介

Velto 是一个没有虚拟 DOM 的前端框架。采用的是 JSX 的语法，近乎零成本的学习，即可上手进行应用开发。

如下是基本示例：

``` Javascript
import { createApp } from '@velto/runtime';

function App () {
  return (
    <div> Velto </div>
  )
}

createApp(App, document.getElementById('app'));
```