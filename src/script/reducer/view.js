/*
 * @Author: WenJW
 * @Date: 2018-07-27 16:57:24
 * @Last Modified by: WenJW
 * @Last Modified time: 2018-07-27 17:06:27
 * @description
 */
import Golbal from './global'

export default (state = {}, action) => {
  switch (action.type) {
    case 'VIEW_SIZE':
      return {
        ...state,
        ...Golbal.view,
        ...action.data,
      }
    default:
      return {
        ...Golbal.view,
      }
  }
}