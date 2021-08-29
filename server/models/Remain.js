/*
 * @Date: 2021-08-25 20:13:22
 * @LastEditors: AaronChu
 * @LastEditTime: 2021-08-28 23:59:50
 */
const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name: { type: String, unique: true },
  type: { type: String, ref: 'Category' },
  cu1: { type: String, ref: 'Part' },
  cu2: { type: String, ref: 'Part' },
  cu3: { type: String, ref: 'Part' },
  ag1: { type: String, ref: 'Part' },
  ag2: { type: String, ref: 'Part' },
  au: { type: String, ref: 'Part' },
  stock: { type: String },
  getways: { type: String },
  creator: { type: String, ref: 'User' },
  updater: { type: String, ref: 'User' },
}, {
  timestamps: true
})

module.exports = mongoose.model('Remain', schema)