
export default {
  state: {
    isLogo: false, // 是否登录
    userInfo: {},
    title: 'withFriends', // 网页title
    old: false, // 系统版本是否太低
    version: false , // 系统信息
  },
  mutations: {
    /**
     * @description 更新数据状态
     * @param {any} state mutation
     * @param {object} data 参数
     */
    _localUpData: (state, data) => {
      for (const item of Object.keys(data)) {
        if (state[item] === undefined) {
          throw(new Error(item + ' is not defined!(Vuex)'))
        }
        state[item] = data[item] }
    }
  }
}
