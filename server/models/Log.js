/*
 * @Date: 2021-09-24 16:49:49
 * @LastEditors: AaronChu
 * @LastEditTime: 2021-09-24 18:24:54
 */
const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  content: { type: String},
  version: { type: String },
  date: { type: String },
  type: { type: String, ref: 'Category' },
  status: { type: Number },
  creator: { type: String, ref: 'User' },
  updater: { type: String, ref: 'User' },
}, {
  timestamps: true
})

module.exports = mongoose.model('Log', schema)