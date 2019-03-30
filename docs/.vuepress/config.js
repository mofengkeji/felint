module.exports = {
  title: 'Hello VuePress',
  description: 'Just playing around',
  themeConfig: {
    displayAllHeaders: true,
    sidebarDepth: 3,
    sidebar: [
      {
        title: 'Vue',
        collapsable: false,
        sidebarDepth: 3,
        children: ['/vue/basic', '/vue/vuex']
      }
    ]
  }
}
