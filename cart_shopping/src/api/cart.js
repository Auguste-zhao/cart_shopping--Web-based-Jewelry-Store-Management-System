import { proxyHttp } from '@/utils/axios';

export function getId(id) {
  return proxyHttp.get({
    url: '/cart',
    params: {
      id,
    },
  });
}

export function addToCart(id,itemId,num) {
  return proxyHttp.get({
    url: '/cart/addToCart',
    params: {
      id,
      itemId,
      num,
    },
  });
}

export function clearCart(id) {
  return proxyHttp.get({
    url: '/cart/clearCart',
    params: {
      id,
    },
  });
}

export function deleteItem(id,itemId) {
  return proxyHttp.get({
    url: '/cart/deleteItem',
    params: {
      id,
      itemId,
    },
  });
}