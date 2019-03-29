# Layout

The overall layout of the page is the outermost frame structure of a product and often includes navigation, sidebars, breadcrumbs, and content. To understand a background project, first understand its basic layout.

![](https://wpimg.wallstcn.com/7066d74f-12c5-47d6-b6ad-f22b43fec917.png)

::: tip Code
[@/views/layout](https://github.com/PanJiaChen/vue-element-admin/tree/master/src/views/layout)
:::

`@` is webpack's [alias](https://webpack.js.org/configuration/resolve/#resolve-alias) don't understand please study it yourself.

<br>

Most of the pages in `vue-element-admin` are based on this `layout`, except that individual pages such as: `login` , `404`, `401` , etc., do not use this layout. It is also easy if you want to have multiple layouts in a project, as long as you choose different layout components in the first-level routing.

```js
//No layout
{
  path: '/401',
  component: _import('errorPage/401')
}

//Has layout
{
  path: '/documentation',

  // You can choose different layout components
  component: Layout,

  // Here the route is displayed in app-main
  children: [{
    path: 'index',
    component: _import('documentation/index'),
    name: 'documentation'
  }]
}
```

This uses vue-router [routing nesting](https://router.vuejs.org/guide/essentials/nested-routes.html), so in general, adding or modifying a page will only affect the main body of app-main. Other content in the layout, such as: the sidebar or navigation bar will not change with your main page.

```
/foo                                  /bar
+------------------+                  +-----------------+
| layout           |                  | layout          |
| +--------------+ |                  | +-------------+ |
| | foo.vue      | |  +------------>  | | bar.vue     | |
| |              | |                  | |             | |
| +--------------+ |                  | +-------------+ |
+------------------+                  +-----------------+
```

当然你也可以一个项目里面使用多个不同的 `layout`，只要在你想作用的路由父级上引用它就可以了。

<br>

## app-main

::: tip Code
[@/views/layout/components/AppMain](https://github.com/PanJiaChen/vue-element-admin/blob/master/src/views/layout/components/AppMain.vue)
:::

Here is a layer of `keep-alive` outside the `app-main` is mainly to cache `<router-view>`, with the `tabs-view` tab navigation of the page, if you do not need to [remove](tags-view.md) it.

The `transition` defines the switching animation between pages, you can modify the transition animation according to your own needs.

<br>

## router-view

**Different router the same component vue。** In a real work, there are many situations. such as:

![](https://wpimg.wallstcn.com/ac5047c9-cb75-4415-89e3-9386c42f3ef9.jpeg)

The same component is used to create pages and edit pages. By default, when these two pages are switched, it will not trigger the created or mounted hooks of vue. Officials say that you can do this through the change of watch $route. To tell the truth it's still very troublesome. Later I discovered that I could simply add a unique key to the router-view to ensure that the routing hooks are re-rendered when the route is switched. This is much simpler.

```js
<router-view :key="key"></router-view>

computed: {
  key() {
    // Or :key="route.fullPath" Just make sure the key is the unique
    return this.$route.name !== undefined? this.$route.name + +new Date(): this.$route + +new Date()
  }
 }
```

::: tip
**Or** You can declare two different views like the `editForm` and `createForm` in this project but introduce the same component.

Code：[@/views/form](https://github.com/PanJiaChen/vue-element-admin/tree/master/src/views/form)
:::

```html
<!-- create.vue -->
<template>
  <article-detail :is-edit='false'></article-detail> //create
</template>
<script>
  import ArticleDetail from './components/ArticleDetail'
</script>

<!-- edit.vue -->
<template>
   <article-detail :is-edit='true'></article-detail> //edit
</template>
<script>
  import ArticleDetail from './components/ArticleDetail'
</script>
```

>

## Mobile

The `element-ui` official position is the desktop-side framework, and for the management of such a complex project in the background, it is impossible to meet the desktop-side and mobile-side interactions through simple adaptation. Therefore, the interaction between the two ends must be different. Make a mobile version of the background, it is recommended to re-do a system.

So, this project will not adapt to the mobile terminal. It just does a simple response and you can modify it yourself.
