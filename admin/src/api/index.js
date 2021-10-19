/*
 * @Date: 2021-09-17 17:50:01
 * @LastEditors: AaronChu
 * @LastEditTime: 2021-10-18 17:18:44
 */
import request from '@/utils/request'
import axios from 'axios'
export function total() {
  return request.get('/total')
}

export function statistics() {
  return axios({
    method: 'get',
    url: 'https://tongji-api.dcloud.net.cn/uni/stat/api/visit/apps-overview?p=0',
    headers: {
      'token': 'a140cdbbf409bd8de58be12584ad47e7'
    },
  })
}