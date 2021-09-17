/*
 * @Date: 2021-09-17 17:50:01
 * @LastEditors: AaronChu
 * @LastEditTime: 2021-09-17 17:52:27
 */
import request from '@/utils/request'

export function total() {
  return request.get('/total')
}