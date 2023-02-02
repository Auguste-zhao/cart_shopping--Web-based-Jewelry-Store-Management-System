import { defHttp } from '@/utils/axios';

export function login(data) {
  return defHttp.post({
    url: '/customers/login',
    data,
  });
}

export function salesmanLogin(data) {
  return defHttp.post({
    url: '/salesperson/login',
    data,
  });
}

export function getInfo() {
  return defHttp.get({
    url: '/customers/info',
  });
}
export function getSalesmanInfo() {
  return defHttp.get({
    url: '/salesperson/info',
  });
}
export function getCustomerInfo(params) {
  return defHttp.get({
    url: '/customers/list/getCustomersByName',
    params
  });
}

export function logout() {
  return defHttp.post({
    url: 'customers/logout',
  });
}

export function register(data) {
  return defHttp.post({
    url: '/customers/register',
    data
  })
}


export function customerEdit(data) {
  return defHttp.put({
    url: '/customers/list/update',
    data
  })
}