/*
 * @Date: 2021-09-24 14:35:30
 * @LastEditors: AaronChu
 * @LastEditTime: 2021-09-24 14:36:57
 */
import request from '@/utils/request'

export function list(page, pageSize, search, sort) {
  return request.get('/people/list', {params:{
    page, pageSize, search, sort
  }})
}

export function creatPeople(data){
  return request.post('/people/create', data)
}

export function getPeopleInfo(id) {
  return request.get(`/people/info/${id}`)
}

export function deletePeople(id) {
  return request.delete(`/people/delete/${id}`)
}

export function changePeople(id, data) {
  return request.put(`/people/change/${id}`, data)
}