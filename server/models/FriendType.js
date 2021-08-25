/*
 * @Date: 2021-08-25 12:07:24
 * @LastEditors: AaronChu
 * @LastEditTime: 2021-08-25 15:20:25
 */
const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name: { type: String, unique: true }, // 
  creator: { type: String, ref: 'User' }, // 创建者id
  updater: { type: String, ref: 'User' } // 更新者id
}, {
  timestamps: true
})

module.exports = mongoose.model('FriendType', schema)