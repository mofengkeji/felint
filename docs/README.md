# Lint

## commit msg规范

### Why
我们不允许无意义、混乱的msg，类似于 `git commit -m '123'`，这会让提交历史惨不忍睹，也不利于浏览改动历史，不利于意会每一次的改动意图或者内容。而规范的commit msg可以让我们获得很多好处：

1. 提供更多的历史信息，方便快速浏览。

下面是一个遵循了一定规范的例子

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

type用于说明 commit 的类别，只允许使用下面7个标识。

- feat：新功能（feature）
- fix：修补bug
- docs：文档（documentation）
- style： 格式（不影响代码运行的变动）
- refactor：重构（即不是新增功能，也不是修改bug的代码变动）
- test：增加测试
- chore：构建过程或辅助工具的变动

如果type为feat和fix，则该 commit 将肯定出现在 Change log 之中。

scope用于说明 commit 影响的范围，比如数据层、控制层、视图层等等，或者用户模块、推广模块、商品模块。

subject是 commit 目的的简短描述，不超过50个字符。

body则是详细描述

footer：如果当前代码与上一个版本不兼容，则 Footer 部分以`BREAKING CHANGE`开头，后面是对变动的描述、以及变动理由和迁移方法。

### 配套工具
```
npm install --save-dev commitizen validate-commit-msg husky standard-version
```
- commitizen

用于生成angular规范commit msg

- validate-commit-msg, husky

husky允许我们在commit前运行命令，validate-commit-msg帮助我们检查commit msg

- standard-version

用于生成changelog，规划版本，通常上线后用
