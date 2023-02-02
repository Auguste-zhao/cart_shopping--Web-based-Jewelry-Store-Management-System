import { defHttp } from '@/utils/axios'
export function getAnnouncementApi(data) {
  return defHttp.get({
    url: '/announcement/list',
    data
  })
}
export function announcementAdd(data) {
  return defHttp.post({
    url: '/announcement/list',
    data
  })
}
export function announcementDel(id) {
  return defHttp.delete({
    url: '/announcement/list',
    params: id
  })
}
