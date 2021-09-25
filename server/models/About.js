/*
 * @Date: 2021-09-25 00:08:01
 * @LastEditors: AaronChu
 * @LastEditTime: 2021-09-25 00:08:01
 */
const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  text: { type: String },
  creator: { type: String, ref: 'User' },
  updater: { type: String, ref: 'User' },
}, {
  timestamps: true
})

module.exports = mongoose.model('About', schema)