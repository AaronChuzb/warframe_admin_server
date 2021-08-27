/*
 * @Date: 2021-08-25 20:13:22
 * @LastEditors: AaronChu
 * @LastEditTime: 2021-08-27 17:35:04
 */
const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name: { type: String, unique: true },
  type: { type: String, ref: 'Part' },
  cu1: { type: String, ref: 'Part' },
  cu2: { type: String, ref: 'Part' },
  cu3: { type: String, ref: 'Part' },
  ag1: { type: String, ref: 'Part' },
  ag2: { type: String, ref: 'Part' },
  au: { type: String, ref: 'Part' },
  getways: { type: String },
  creator: { type: String, ref: 'User' },
  updater: { type: String, ref: 'User' },
}, {
  timestamps: true
})

module.exports = mongoose.model('Remain', schema)