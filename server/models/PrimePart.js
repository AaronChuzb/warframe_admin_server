/*
 * @Date: 2021-08-25 16:33:56
 * @LastEditors: AaronChu
 * @LastEditTime: 2021-08-25 17:43:50
 */
const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name: { type: String, unique: true }, // 名称
  type: { type: String },
  creator: { type: String, ref: 'User' }, // 创建者id
  updater: { type: String, ref: 'User' } // 更新者id
}, {
  timestamps: true
})

module.exports = mongoose.model('PrimePart', schema)