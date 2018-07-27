/*
 * @Author: WenJW
 * @Date: 2018-07-09 14:27:50
 * @Last Modified by:   WenJW
 * @Last Modified time: 2018-07-09 14:27:50
 * @description
 */

export const inBrowser = typeof window !== 'undefined'
export const UA = inBrowser && window.navigator.userAgent.toLowerCase()
export const isIE = UA && /msie|trident/.test(UA)
export const isIE9 = UA && UA.indexOf('msie 9.0') > 0
export const isEdge = UA && UA.indexOf('edge/') > 0
export const isAndroid = (UA && UA.indexOf('android') > 0)
export const isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA))
export const isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge
