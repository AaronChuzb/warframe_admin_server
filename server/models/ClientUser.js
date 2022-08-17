/*
 * @Date: 2021-10-25 17:28:33
 * @LastEditors: AaronChu
 * @LastEditTime: 2022-08-17 12:37:17
 */
const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  nickName: { type: String }, 
  avatarUrl: { type: String }, 
  openid: { type: String },
  platForm: { type: String },
  gameId: { type: String },
  level: { type: Number },
  remark: { type: String },
  canLogin: { type: Boolean }
}, {
  timestamps: true
  
})

module.exports = mongoose.model('ClientUser', schema)