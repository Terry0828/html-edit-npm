
/**
 * @description 获取数据类型
 * @param {*} data
 * @returns
 */
const getDataType = (data) => {
  return Object.prototype.toString.call(data).toLowerCase().replace(/^\[object (\w+)\]$/, '$1')

}
exports._getDataType = data => getDataType(data)


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
  } else { throw(new Error(`传入的值不是数组或对象！(type: ${getDataType(data)})`)) }
}
exports._valMap = data => valMap(data)
