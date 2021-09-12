/*
 * @Date: 2021-09-02 17:25:58
 * @LastEditors: AaronChu
 * @LastEditTime: 2021-09-10 01:40:57
 */
import request from '@/utils/request'

export function create(name) {
  return request.post('/category/create',{
    name
  })
}

export function list(page, pageSize, search, sort, user) {
  return request.get('/category/list', {params:{
    page, pageSize, search, sort, user
  }})
}

export function change(id, data) {
  return request.put(`/category/edit/${id}`, data)
}

export function deleted(id) {
  return request.delete(`/category/delete/${id}`)
}