export default {
  state: {
    index: 0, // 用于生成 hash，依次累加
    data: {}, // 存放页面配置文件
    a: { b: { c: { d: 'yes' } } }
  },
  mutations: {
    /**
     * @description 更新数据状态
     * @param {any} state mutation
     * @param {any} config.data 参数
     * @param {any} config.keys 数据结构 ['a', 'b'] => state.a.b
     */
    _appUpData: (state, config) => {
      const { data, keys } = config
      let _state = state
      if (keys) {
        for (const key of keys) {
          _state = _state[key]
        }
      }
      for (const item of Object.keys(data)) {
        if (_state[item] === undefined) {
          throw(new Error(item + ' is not defined!(Vuex)'))
        }
        _state[item] = data[item] }
    }
  }
}
