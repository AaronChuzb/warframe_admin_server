/*
 * @Date: 2021-09-17 17:50:01
 * @LastEditors: AaronChu
 * @LastEditTime: 2021-10-30 23:42:13
 */
import request from '@/utils/request'
import axios from 'axios'
export function total() {
  return request.get('/total')
}
