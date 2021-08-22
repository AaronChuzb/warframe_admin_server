/*
 * @Date: 2021-08-22 00:02:55
 * @LastEditors: AaronChu
 * @LastEditTime: 2021-08-22 21:27:25
 */
const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  nickname: { type: String }, // 用户昵称
  avatar: { type: String }, // 用户头像
  username: { type: String }, // 用户名
  password: { 
    type: String,
    select: false,
    set(val){
      return require('bcrypt').hashSync(val, 10)
    } 
  },
  editorUesrId: { type: String }
})

module.exports = mongoose.model('User', schema)