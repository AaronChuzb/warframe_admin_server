/*
 * @Date: 2021-08-25 10:01:09
 * @LastEditors: AaronChu
 * @LastEditTime: 2021-08-25 15:21:31
 */
const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name: { type: String, unique: true },
  type: { type: String },
  img: { type: Array },
  level: { type: String }, // 段位需求
  self_pole: { type: Array }, // 极性槽
  gun: { type: Object }, // 枪械类型， 以及属性
  melee: { type: Object }, // 近战类型，以及属性
  resonance: { type: String }, // 共鸣
  hurt: { type: String }, // 总伤害
  crit_rate: { type: String }, // 暴击几率
  crit_multiplier: { type: String }, // 暴击倍率
  trigger_rate: { type: String }, // 触发几率
  mode: { type: Array }, // 其他模式
  editorData: { type: String }, // 富文本内容
  creator: { type: String, ref: 'User' }, // 创建者id
  updater: { type: String, ref: 'User' } // 更新者id
}, {
  timestamps: true
  
})

module.exports = mongoose.model('Weapon', schema)