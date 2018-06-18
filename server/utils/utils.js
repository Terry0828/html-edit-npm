
/**
 * @description 获取数据类型
 * @param {*} data
 * @returns
 */
const getDataType = (data) => {
  return Object.prototype.toString.call(data).toLowerCase().replace(/^\[object (\w+)\]$/, '$1')

}
exports._getDataType = data => getDataType(data)
