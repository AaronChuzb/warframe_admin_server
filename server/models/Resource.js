/*
 * @Date: 2021-08-29 16:22:44
 * @LastEditors: AaronChu
 * @LastEditTime: 2021-08-29 16:24:24
 */
const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name: { type: String, unique: true },
  img: { type: String },
  type: { type: String },
  from: { type: String },
  creator: { type: String, ref: 'User' },
  updater: { type: String, ref: 'User' },
}, {
  timestamps: true
})

module.exports = mongoose.model('Resource', schema)