/*
 * @Date: 2021-08-21 20:03:47
 * @LastEditors: AaronChu
 * @LastEditTime: 2021-09-17 17:47:06
 */
module.exports = app => {
  const express = require('express')
  // 登录校验中间件
  const auth = require('../../middleware/auth')
  const mongoose = require('mongoose')
  // token转换秘钥
  app.set('secret', 'maliho123.')

  // 获取oss秘钥接口
  app.get('/admin/api/oss', auth(), async (req, res)=>{
    const Model = require('../../models/Oss')
    const model = await Model.findOne({}, {__v: 0})
    res.send(model)
  })
  // 获取统计信息
  app.get('/admin/api/total', auth(), async (req, res)=>{
    const remain = await (await mongoose.connections[0].collections.remains.stats()).count
    const category = await (await mongoose.connections[0].collections.categories.stats()).count
    const part = await (await mongoose.connections[0].collections.parts.stats()).count
    res.send({
      remain,
      category,
      part
    })
  })
}