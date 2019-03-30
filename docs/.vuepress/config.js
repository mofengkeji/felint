module.exports = {
  title: '墨锋科技',
  description: 'smart coding',
  themeConfig: {
    displayAllHeaders: true,
    sidebarDepth: 3,
    sidebar: [
      {
        title: 'Vue',
        collapsable: false,
        sidebarDepth: 3,
        children: ['/vue', '/vue/vuex']
      }
    ]
  }
}
