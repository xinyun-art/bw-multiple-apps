// 导出defineConfig方法可以让编辑器（VSCode）智能提示所有的rollup的配置项
import { defineConfig } from "rollup";
// 用于在 node_modules 中使用第三方模块
// 当项目中引入外部资源时，如 npm 包（eg：import { sum } from "lodash-es"），rollup 不知道如何打破常规去处理这些依赖--报错提示通常为：(!) Unresolved dependencies。
// 有 2 种方法引入外部资源：
  // 添加插件 @rollup/plugin-node-resolve 将我们编写的源码与依赖的第三方库进行合并；
  // 配置 external 属性，告诉 rollup.js 哪些是外部的类库。
import nodeResolve from "@rollup/plugin-node-resolve";
// 用于 Rollup 和 Typescript 之间的无缝集成
import typescript from "@rollup/plugin-typescript";
// 用于将 CommonJS 模块转换为 ES6，以便它们可以包含在 Rollup 包中
import commonjs from "@rollup/plugin-commonjs";
// 用于将 .json 文件转换为 ES6 模块
import json from "@rollup/plugin-json";
// 用于 Rollup 和 Babel 之间的无缝集成
// import babel from "@rollup/plugin-babel";

// 其实不推荐直接使用 TSC 作为项目的打包编译工具
// 建议使用 Babel 用于 将 TS 编译为 JS 代码，TS类型检查工作可以交给 代码编辑器承担，同时可以增加TS检查命令：
// package.json
  // {
  //   "script": {
  //     "tsCheck": "tsc --noEmit"
  //   }
  // }
// 可以把类型检查放到特定的 npm scripts 生命周期之前，另外其实也可以将类型检查放到 git commit 阶段，用于做必要的 TS 类型检查，保证项目的正确性。

// 为什么不推荐直接使用 TSC 作为项目的打包编译工具，那么接下来就简单看看在常见的几款打包工具中针对 TypeScript 的编译方案是如何设计的？
// 推荐文章：https://mdnice.com/writing/0406487dcb5c4471ba6225d62aca3711

// https://juejin.cn/post/7145090564801691684
// https://mdnice.com/writing/0406487dcb5c4471ba6225d62aca3711
// https://juejin.cn/post/7049354102509142029
// https://cloud.tencent.com/developer/article/2316035
// https://www.binance.com/zh-CN/feed/post/1019632
// https://zhuanlan.zhihu.com/p/678811563

import pkg from './package.json' assert { type: "json" };

const libName = pkg.name

export default defineConfig({
  input: "index.ts",
  output: [
    {
      file: `dist/${libName}.cjs.js`,
      // CommonJS，适用于 Node 环境和其他打包工具（别名：commonjs）
      format: 'cjs'
    },
    {
      file: `dist/${libName}.es.js`,
      // 将 bundle 保留为 ES 模块文件，适用于其他打包工具，以及支持 <script type=module> 标签的浏览器。（别名：esm，module）
      format: 'es'
    },
    {
      file: `dist/${libName}.iife.js`,
      // 通用模块定义规范，同时支持 amd，cjs 和 iife
      format: 'iife',
      // 外部引入的模块需要显式告知使用的三方模块的命名，结合下面的external使用
      // 该选项用于在 umd / iife bundle 中，使用 id: variableName 键值对指定外部依赖。例如，在这样的情况下：
      // import $ from 'jquery';
      globals: {
        // jquery: '$' // 我们需要告诉 Rollup jquery 是外部依赖，jquery 模块的 ID 为全局变量 $
      },
      // 注意如果是iife格式的bundle的话name属性是必须的，这时可以在script标签引入后window下会挂载该属性的变量来使用你的类库方法
      name: 'ctUtils'
    },
    {
      file: `dist/${libName}.umd.js`,
      // 通用模块定义规范，同时支持 amd，cjs 和 iife
      format: 'umd',
      // 外部引入的模块需要显式告知使用的三方模块的命名，结合下面的external使用
      globals: {
        // jquery: '$'
      },
      // 注意如果是umd格式的bundle的话name属性是必须的，这时可以在script标签引入后window下会挂载该属性的变量来使用你的类库方法
      name: 'ctUtils'
    }
  ],
  plugins: [
    commonjs(),
    nodeResolve(),
    typescript({
      sourceMap: false,
    }),
    json()
  ]
});