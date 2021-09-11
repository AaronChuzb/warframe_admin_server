/*
 * @Date: 2021-09-01 22:15:06
 * @LastEditors: AaronChu
 * @LastEditTime: 2021-09-11 18:22:54
 */
import request from '@/utils/request'

export function login(username, password) {
  return request.post('/user/login',{
    username,
    password
  })
}

export function getInfo() {
  return request.get('/user/info')
}

export function list(page, pageSize, search) {
  return request.get('/user/list', {params:{
    page, pageSize, search
  }})
}

export function logout() {
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}

export function getOssInfo(){
  return request.get('/oss')
}

export function changeStatus(id, status){
  return request.put(`/user/stop/${id}`, { status })
}
