# Lint

## commit msg

### Why
我们不允许无意义、混乱的msg，类似于 `git commit -m '123'`，这会让提交历史惨不忍睹，也不利于浏览改动历史，不利于意会每一次的改动意图或者内容。而规范的commit msg可以让我们获得很多好处：

1. 提供更多的历史信息，方便快速浏览。

下面是一个遵循了一定规范的例子（格式还是有点问题）

```bash
git log HEAD --pretty=format:%s # 漂亮地打印出提交历史

fix: 选择银行样式更改
fix: 选择银行页面被之前的滚动穿透代码影响，把选择银行中有滚动穿透的代码去掉（选择年月的滚动穿透代码未删除）
fix 去掉路由进入组件ChooseCard
fix 银行选择
feat 新增搜索银行
fix 海报页面清除setTimeout
fix 推荐人必填
fix picker穿透
fix 跳转到添加银行卡时，遗漏参数
fix ios穿透问题
fix 借记卡贷记卡更改
fix 认证成功跳转
fix 银行卡
fix: picker
fix 注册弹框显示关注二维码
fix 选择海报页图片懒加载
fix 收款页面删除按钮样式
```

2. 可以直接从commit生成Change log。

Change Log 是发布新版本时，用来说明与上一个版本差异的文档，用工具自动生成即可

3. 让源码管理更有意义

下文我们会说到，我们会将commit msg分为几种类型：新功能、修补bug、文档改动、格式改动、重构、增加测试。当我们接手项目时，通常我们会被指派实现多个需求、修复一大堆bug，很多人习惯全部写完之后一股脑的commit push上去，这种做法实际上反映出了你在代码管理方面极差的控制力。

git管理的意义就在于，我们能够恢复糟糕、不稳定的改动，并且结构化地浏览它们，而不是单纯得文件上传。

4. 帮助你写代码时标签化、任务化

我们推崇的是，将你的任务划分为上述得几个改动类型，每一次改动完后就提交一次。这能够帮助你清晰地了解到你的任务反映在代码上做了什么类型的改动，并且帮助你更好地了解这次改动可能波及到的范围（我们通常不希望一个功能改动后影响到其他功能）

### Angular规范
社区有多种 Commit message 的写法规范。而我们遵循Angular规范，这是目前使用最广的写法，比较合理和系统化，并且有配套的工具。

#### 格式

每次提交，Commit message 都应该包括三个部分：Header，Body 和 Footer。

```
<type>(<scope>): <subject>
// 空一行
<body>
// 空一行
<footer>
```

其中，Header 是必需的，Body 和 Footer 可以省略。

`type`用于说明 commit 的类别，只允许使用下面7个标识。

- feat：新功能（feature）
- fix：修补bug
- docs：文档（documentation）
- style： 格式（不影响代码运行的变动）
- refactor：重构（即不是新增功能，也不是修改bug的代码变动）
- test：增加测试
- chore：构建过程或辅助工具的变动

如果type为feat和fix，则该 commit 将肯定出现在 Change log 之中。

`scope`用于说明 commit 影响的范围，比如数据层、控制层、视图层等等，或者用户模块、推广模块、商品模块。

`subject`是 commit 目的的简短描述，不超过50个字符。

`body`则是详细描述

如果当前代码与上一个版本不兼容，则 `footer` 部分以`BREAKING CHANGE`开头，后面是对变动的描述、以及变动理由和迁移方法。

### 配套工具

- commitizen

用于生成angular规范commit msg

全局安装
```bash
npm i -g commitizen
```
然后，在项目目录里，运行下面的命令，使其支持 Angular 的 Commit message 格式。

```bash
commitizen init cz-conventional-changelog --save --save-exact
```
以后，凡是用到git commit命令，一律改为使用git cz。这时，就会出现选项，用来生成符合格式的 Commit message。

![cz](https://github.com/commitizen/cz-cli/raw/master/meta/screenshots/add-commit.png)

- commitlint, husky

husky允许我们在commit前运行命令，commitlint帮助我们检查commit msg

安装至dev依赖
```bash
# husky
npm i --save-dev husky

# commitlint
npm install --save-dev @commitlint/config-conventional @commitlint/cli
```
在根目录添加`commitlint.config.js`配置文件
```js
module.exports = {
  extends: ['@commitlint/config-conventional']
}
```

配置commit前要执行的脚本
```json
// package.json
{
  "husky": {
    "hooks": {
      "commit-msg": "commitlint -E HUSKY_GIT_PARAMS"
    }
  }
}
```

- standard-version

用于生成changelog，规划版本，当我们需要发布线上版本时，必须执行

安装
```bash
npm i --save-dev standard-version
```
添加 `npm run release`脚本，并且在push前执行它
``` json
// package.json
{
  "scripts": {
    "release": "standard-version -p angular -i CHANGELOG.md -w"
  }
}
```

## eslint

eslint是一个帮助我们对代码格式进行约束的包

只需要在项目安装后，在项目根目录添加规则配置文件 `.eslintrc.js` ，利用IDE例如VSCode，就可以再保存时自动格式化代码

vscode配置片段（其他ide请自行百度）
> File->Preferences->Settings->搜索eslint->找到Edit in settings.json
```json
// settings.json
"eslint.autoFixOnSave": true,
"eslint.validate": [
    "javascript",{
        "language": "vue",
        "autoFix": true
    },"html",
    "vue"
],
```

所有类型的项目必须配置eslint，不然当你发布正式环境时，CI (自动部署工具)会拒绝部署。

> 具体安装配置方法请查看[共享配置仓库](https://github.com/mofengkeji/eslint-config-mofengkeji)

配置`npm run lint`脚本，可以批量格式化代码
```json
// package.json
"scripts": {
    "lint": "eslint --fix --ext .js,.vue src",
},
```

重新配置husky
```json
// package.json
{
  "husky": {
    "hooks": {
      "commit-msg": "npm run lint && commitlint -E HUSKY_GIT_PARAMS"
    }
  }
}
```



