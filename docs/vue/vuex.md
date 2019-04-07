# vuex

- store当中不得含有视图层的操作

- mutation命名必须以`SET_`开头，一个sate的最好只对应一个mutation，并以state的UPPER_SNAKE_CASE结尾

反例：
```js
mutations: {
    authInfo(state, data) {
      state.token = data.token
      state.userInfo = data.userInfo
    }
}    
```

正例：
```js
mutations: {
    SET_TOKEN(state, token) {
      state.token = token
    },
    SET_USER_INFO(state, userInfo) {
      state.userInfo = userInfo
    }
}
```

- action必须以驼峰命名，且首字母大写，并且最好都声明为`async function`

```js
actions: {
    async GetUserInfo({ commit, state }, params) {
      await new Promise((resolve, reject) => {
        api.center.getUserInfo().then(res => {
          commit('SET_USER_INFO', res.data.data)
          resolve()
        })
      })
    },
    async SetToken({ commit, state }, params) {
      localStorage.setItem('token', JSON.stringify(params))
      commit('SET_TOKEN', params)
    },
    async LogOut({ commit, state }) {
      localStorage.removeItem('token')
      commit('SET_USER_INFO', null)
      commit('SET_TOKEN', null)
    },
}
```
