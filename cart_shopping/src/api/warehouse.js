import { defHttp } from '@/utils/axios'

/**
 * 获取上海仓库商品
 * @param data
 * @returns {Promise<any>}
 */
export function productsShanghaiApi() {
  return defHttp.get({
    url: '/warehouse/shanghai'
  })
}
/**
 * 获取北京仓库商品
 * @param data
 * @returns {Promise<any>}
 */
export function productsPekingApi() {
  return defHttp.get({
    url: '/warehouse/peking'
  })
}
/**
 * 获取广州仓库商品
 * @param data
 * @returns {Promise<any>}
 */
export function productsGuangzhouApi() {
  return defHttp.get({
    url: '/warehouse/guangzhou'
  })
}
/**
 * 获取重庆仓库商品
 * @param data
 * @returns {Promise<any>}
 */
export function productsChongqingApi() {
  return defHttp.get({
    url: '/warehouse/chongqing'
  })
}
