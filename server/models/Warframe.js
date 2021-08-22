/*
 * @Date: 2021-08-21 20:19:08
 * @LastEditors: AaronChu
 * @LastEditTime: 2021-08-22 21:22:46
 */
const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name: { type: String }, // 战甲名称
  type: { type: String },
  img: { type: Array }, // 图片列表
  level: { type: String }, // 战甲段位需求
  hp: { type: String }, // 血量
  sheild: { type: String }, // 护盾
  energy: { type: String }, // 能量
  armor: { type: String }, // 护甲
  speed: { type: String },  // 冲刺速度读
  self_pole: { type: Array }, // 极性槽
  halo_pole: { type: String }, // 光环极性槽
  passive_skill: { type: String }, // 被动技能
  skills: { type: Array }, // 技能列表
  editorData: { type: String }, // 富文本内容
  editorUserId: { type: String } // 创建者id
}, {
  timestamps: true
})

module.exports = mongoose.model('Warframe', schema)