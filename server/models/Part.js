/*
 * @Date: 2021-08-26 14:51:51
 * @LastEditors: AaronChu
 * @LastEditTime: 2021-08-26 15:09:19
 */
const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name: { type: String, unique: true },
  creator: { type: String, ref: 'User' },
  updater: { type: String, ref: 'User' },
}, {
  timestamps: true
})

module.exports = mongoose.model('Part', schema)