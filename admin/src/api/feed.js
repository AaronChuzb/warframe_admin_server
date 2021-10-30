/*
 * @Date: 2021-10-30 23:29:36
 * @LastEditors: AaronChu
 * @LastEditTime: 2021-10-30 23:29:37
 */
import request from '@/utils/request'

export function list(page, pageSize, search, status) {
  return request.get('/feed/list', {params:{
    page, pageSize, search, status
  }})
}
export function changeStatus(id, data) {
  return request.put(`/feed/change/${id}`, data)
}

export function deleteItem(id) {
  return request.delete(`/feed/delete/${id}`)
}