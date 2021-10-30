/*
 * @Date: 2021-10-30 22:37:47
 * @LastEditors: AaronChu
 * @LastEditTime: 2021-10-30 22:40:44
 */
const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  nick_name: { type: String},
  content: { type: String},
  object: { type: String},
  platform: { type: String },
  status: { type: Number },
}, {
  timestamps: true
})

module.exports = mongoose.model('Feed', schema)