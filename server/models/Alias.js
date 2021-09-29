/*
 * @Date: 2021-09-29 10:54:50
 * @LastEditors: AaronChu
 * @LastEditTime: 2021-09-29 11:02:48
 */
const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name: { type: String, unique: true },
  alias: { type: String },
  creator: { type: String, ref: 'User' },
  updater: { type: String, ref: 'User' },
}, {
  timestamps: true
})

module.exports = mongoose.model('Alias', schema)