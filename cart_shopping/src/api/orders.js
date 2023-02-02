import { defHttp } from '@/utils/axios';

export function getOrders(id) {
  return defHttp.get({
    url: '/orders/list',
    params: {
      id,
    },
  });
}

export function getOrdersById(id) {
  return defHttp.get({
    url: '/orders/getlistbyid',
    params: {
      id,
    },
  });
}

export function addToOrders(data) {
  return defHttp.post({
    url: '/orders/addToOrders',
    data,
  });
}
