module.exports = {
  base: '/felint/',
  title: '墨锋科技',
  description: 'smart coding',
  themeConfig: {
    displayAllHeaders: true,
    sidebarDepth: 3,
    sidebar: [
      {
        title: 'Lint',
        path: '/',
        collapsable: false,
        sidebarDepth: 3
      },
      {
        title: 'Vue',
        path: '/vue/',
        collapsable: false,
        sidebarDepth: 3,
        children: ['/vue/', '/vue/vuex']
      }
    ]
  }
}
