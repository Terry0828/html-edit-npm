/*
 * @Author: WenJW
 * @Date: 2018-07-27 16:57:24
 * @Last Modified by: WenJW
 * @Last Modified time: 2018-08-03 15:46:16
 * @description
 */
import Golbal from './global'

export default (state = {}, action) => {
  switch (action.type) {
    case 'PROJECT_INFO':
      return {
        ...state,
        ...action.data,
      }
    default:
      return {
        ...state
      }
  }
}