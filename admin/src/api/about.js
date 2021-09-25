/*
 * @Date: 2021-09-25 00:13:51
 * @LastEditors: AaronChu
 * @LastEditTime: 2021-09-25 00:17:01
 */
import request from '@/utils/request'

export function create(data) {
  return request.post('/about/create', data)
}

export function change(id, data) {
  return request.put(`/about/edit/${id}`, data)
}

export function getInfo() {
  return request.get(`/about/info`)
}