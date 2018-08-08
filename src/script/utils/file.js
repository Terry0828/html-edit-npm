/*
 * @Author: WenJW
 * @Date: 2018-08-07 15:59:59
 * @Last Modified by: WenJW
 * @Last Modified time: 2018-08-07 16:34:49
 * @description
 */

import { _Get } from './request'
// 文件是否存在
export const _IsExistFile = (path) => {
  console.log(path)
  _Get(path)
  .then(res => {
    console.log(res)
  })
  // const file = new File(path, name)
  // if(file.exists()) { console.log('file is exist') }
}