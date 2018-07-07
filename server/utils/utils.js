
/**
 * @description 获取数据类型
 * @param {*} data
 * @returns
 */
const getDataType = (data) => {
  return Object.prototype.toString.call(data).toLowerCase().replace(/^\[object (\w+)\]$/, '$1')
}
exports._getDataType = data => getDataType(data)

/**
 * @description
 * @param {[any]} arr 要遍历的数组或对象，其它类型会返回 'error'
 * @param {*} fn 遍历执行的函数,如果 return 一个 false 的话结束当前循环{可用参数,值，健(对象)，索引}
 * @param {boolean} order 正序遍历(true)还是倒序遍历
 * @returns {fn}
 */
const valMap = (data, fn, order = true) => {
  if (getDataType(data) === 'array') {
    order ? null : data.reverse()
    for (let i = 0, len = data.length; i < len; i++) {
      const val = fn(data[i], i)
      if (val === false) { return }
    }
  } else if (getDataType(data) === 'object') {
    const keys = Object.keys(data)
    order ? null : keys.reverse()
    for (let i = 0, len = keys.length; i < len; i++) {
      const val = fn(data[keys[i]], keys[i], i)
      if (val === false) { return }
    }
  } else { return 'error' }
}
exports._valMap = (data, fn, order) => valMap(data, fn, order)
