/*
 * @Date: 2021-09-02 17:25:58
 * @LastEditors: AaronChu
 * @LastEditTime: 2021-09-02 17:31:44
 */
import request from '@/utils/request'

export function create(name) {
  return request.post('/part/create',{
    name
  })
}

export function list(page, pageSize, search) {
  return request.get('/part/list', {params:{
    page, pageSize, search
  }})
}

export function change(id, name) {
  return request.put(`/part/edit/${id}`, {
    name
  })
}

export function deleted(id) {
  return request.delete(`/part/delete/${id}`, {
    name
  })
}