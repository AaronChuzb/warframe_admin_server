/*
 * @Date: 2021-10-11 22:07:21
 * @LastEditors: AaronChu
 * @LastEditTime: 2021-10-11 22:14:51
 */
module.exports = app => {
  const express = require('express')
  const Rotation = require('../../models/Rotation')
  const router = express.Router({
    mergeParams: true
  })
  // 获取奖励列表
  router.get('/list', async (req, res) => {
    // 查出内容
    // 固定奖励
    const fixedList = await Rotation.find({
      is_rotation: false
    },{
      __v: 0,
      createdAt: 0,
      updatedAt: 0,
      creator: 0,
      updater: 0,
      is_rotation: 0
    })
    // 轮换奖励
    const rotationList = await Rotation.find({
      is_rotation: true
    },{
      __v: 0,
      createdAt: 0,
      updatedAt: 0,
      creator: 0,
      updater: 0,
      is_rotation: 0
    }).sort({
      rank: 1
    }).exec()
    res.send({
      fixedList,
      rotationList
    })

  })
  app.use('/app/api/rotation', router)
  app.use(async (err, req, res, next) => {
    res.status(err.statusCode || 500).send({
      message: err.message
    })
  })
}