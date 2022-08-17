/*
 * @Date: 2022-08-17 14:16:46
 * @LastEditors: AaronChu
 * @LastEditTime: 2022-08-17 14:28:00
 */

import request from '@/utils/request'


export function list(page, pageSize, search, platform) {
  return request.get('/client_user/list', {
    params: {
      page,
      pageSize,
      search,
      platform
    }
  })
}

export function changeStatus(id, status) {
  return request.put(`/user/stop/${id}`, {
    status
  })
}



// 用户自行操作部分
export function changeMyPass(oldPass, newPass) {
  return request.put(`/user/change_my_pass`, {
    oldPass,
    newPass
  })
}

export function changeMyContact(contact) {
  return request.put(`/user/change_my_contact`, {
    contact
  })
}

export function changeMyGameId(game_id) {
  return request.put(`/user/change_my_game_id`, {
    game_id
  })
}



