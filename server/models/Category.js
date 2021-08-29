/*
 * @Date: 2021-08-26 10:35:02
 * @LastEditors: AaronChu
 * @LastEditTime: 2021-08-29 16:07:16
 */
// 一级分类模型
const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name: { type: String },
  parent: { type: String, ref: 'Category' },
  creator: { type: String, ref: 'User' },
  updater: { type: String, ref: 'User' },
}, {
  timestamps: true
})

module.exports = mongoose.model('Category', schema)