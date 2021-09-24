/*
 * @Date: 2021-09-24 15:43:46
 * @LastEditors: AaronChu
 * @LastEditTime: 2021-09-24 15:51:42
 */
import request from '@/utils/request'

export function list(page, pageSize, search, type, status) {
  return request.get('/suggest/list', {params:{
    page, pageSize, search, type, status
  }})
}
export function changeStatus(id, data) {
  return request.put(`/suggest/change/${id}`, data)
}