# vue

## 目录结构

```bash
├── build                      // 构建相关
├── config                     // 配置相关
├── src                        // 源代码
│   ├── api                    // 所有请求
│   ├── assets                 // 主题 字体等静态资源
│   ├── components             // 全局公用组件
│   ├── directive              // 全局指令
│   ├── filters                // 全局 filter
│   ├── icons                  // 项目所有 svg icons
│   ├── lang                   // 国际化 language
│   ├── mock                   // 项目mock 模拟数据
│   ├── router                 // 路由
│   ├── store                  // 全局 store管理
│   ├── styles                 // 全局样式
│   ├── utils                  // 全局公用方法
│   ├── vendor                 // 公用vendor
│   ├── views                  // views 所有页面
│   ├── App.vue                // 入口页面
│   ├── main.js                // 入口文件 加载组件 初始化等
│   └── permission.js          // 权限管理
├── static                     // 第三方不打包资源、枚举常量
├── .babelrc                   // babel-loader 配置
├── .eslintignore               // eslint 忽略项
├── .eslintrc.js               // eslint 配置项
├── .gitignore                 // git 忽略项
├── .drone.yml                // 自动化CI配置
├── favicon.ico                // favicon图标
├── index.html                 // html模板
└── package.json               // package.json
```

## 零散的规范

大多数vue的书写规范会在eslint中规范，这里列举一下没办法用eslint约束的项

- 单文件组件必须保持`<script>`、`<template>`、 `<style>`的书写顺序
```html
<!-- ComponentA.vue -->
<template>...</template>
<script>/* ... */</script>
<style>/* ... */</style>

<!-- ComponentB.vue -->
<template>...</template>
<script>/* ... */</script>
<style>/* ... */</style>
```
- 在组件中使用第三方库时，不要将第三方库的配置数据放在data中

Vue会递归data并且监听每个属性， 如果你的第三方库配置数据包含一个大对象, 会导致内存使用过高


> 更多内容敬请期待

