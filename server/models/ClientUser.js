/*
 * @Date: 2021-10-25 17:28:33
 * @LastEditors: AaronChu
 * @LastEditTime: 2021-10-25 17:49:48
 */
const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  wxInfo: { type: String }, // 微信小程序个人信息
  qqInfo: { type: String }, // QQ小程序个人信息
  wxId: { type: String }, // 微信openid
  qqId: { type: String }, // qq openid
  uniquid: { type: String }, // 用户双平台唯一ID
  gameId: { type: String }, // 游戏内ID
  remains: { type: Array }, // 拥有的遗物
  level: { type: Number }, // 段位
  

}, {
  timestamps: true
  
})

module.exports = mongoose.model('User', schema)