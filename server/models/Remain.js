/*
 * @Date: 2021-08-25 20:13:22
 * @LastEditors: AaronChu
 * @LastEditTime: 2021-09-13 17:22:56
 */
const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name: { type: String, unique: true },
  type: { type: String, ref: 'Category' },
  copper_1: { type: String, ref: 'Part' },
  copper_2: { type: String, ref: 'Part' },
  copper_3: { type: String, ref: 'Part' },
  silver_1: { type: String, ref: 'Part' },
  silver_2: { type: String, ref: 'Part' },
  gold: { type: String, ref: 'Part' },
  stock: { type: Boolean },
  getways: { type: String },
  contribute: { type: String },
  creator: { type: String, ref: 'User' },
  updater: { type: String, ref: 'User' },
}, {
  timestamps: true
})

module.exports = mongoose.model('Remain', schema)