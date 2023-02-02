import { defHttp } from '@/utils/axios';

export function productsApi() {
  return defHttp.get({
    url: '/products/list',
  });
}
export function productsDel(id) {
  return defHttp.delete({
    url: '/products/list',
    params: id,
  });
}
export function productsGet(params) {
  return defHttp.get({
    url: '/products/list/getProduct',
    params,
  });
}
export function productsReduce(id, count) {
  return defHttp.get({
    url: '/products/list/reduceProduct',
    params: {
      id,
      count,
    },
  });
}
export function productsByNameGet(params) {
  return defHttp.get({
    url: '/products/list/getProductByName',
    params,
  });
}

// 根据当前商品名称 获取推荐商品
export function getAdviceProducts(title) {
  return defHttp.get({
    url: '/products/list/getAdviceProducts',
    params: {
      title,
    },
  });
}

export function productsEdit(data) {
  return defHttp.put({
    url: '/products/list/update',
    data,
  });
}
export function productsAdd(data) {
  return defHttp.post({
    url: '/products/list',
    data,
  });
}
