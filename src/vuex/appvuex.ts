export default {
  state: {
    tabInfo: [
    ], // tab 配置项
    tabStatus: false // tab是否显示
  },
  mutations: {
    /**
     * @description 更新数据状态
     * @param {any} state mutation
     * @param {any} data 参数
     */
    _appUpData: (state, data) => {
      for (const item of Object.keys(data)) {
        if (state[item] === undefined) {
          throw(new Error(item + ' is not defined!(Vuex)'))
        }
        state[item] = data[item] }
    }
  }
}
