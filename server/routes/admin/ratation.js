/*
 * @Date: 2021-10-10 15:47:06
 * @LastEditors: AaronChu
 * @LastEditTime: 2021-10-10 17:46:12
 */
module.exports = app => {
  const express = require('express')
  const Ratation = require('../../models/Ratation')
  const User = require('../../models/User')
  // 登录校验中间件
  const auth = require('../../middleware/auth')
  // 添加用户记录中间件(一定要放在auth之后)
  const actions = require('../../middleware/actionsRecord')
  const router = express.Router({
    mergeParams: true
  })
  // 新建奖励
  router.post('/create', auth(), actions(), async (req, res) => {
    await Ratation.create(req.body)
    res.send({
      success: true
    })
  })
  // 获取固定奖励列表
  router.get('/list', auth(), async (req, res) => {
    // 查出内容
    // 固定奖励
    const ratationCounts = await Ratation.countDocuments({ is_ratation: true })
    const fixedList = await Ratation.find({ is_ratation: false })
    // 轮换奖励
    const rotationList = await Ratation.find({ is_ratation: true }).sort({ rank: 1 }).exec()
    res.send({
      fixedList,
      rotationList,
      ratationCounts
    })
    
  })

  // 修改奖励数据获取
  router.get('/info/:id', auth(), async (req, res) => {
    const model = await Ratation.findById(req.params.id, {
      __v: 0
    }).populate({
      path: 'creator',
      select: '_id'
    }).populate({
      path: 'updater',
      select: '_id'
    })
    res.send(model)
  })

  // 修改奖励
  router.put('/edit/:id', auth(), actions(), async (req, res) => {
    await Ratation.findByIdAndUpdate(req.params.id, req.body)
    res.send({success: true})
  })

  // 删除奖励
  router.delete('/delete/:id', auth(), async (req, res) => {
    await Ratation.findByIdAndDelete(req.params.id)
    res.send({
      success: true
    })
  })

  app.use('/admin/api/ratation', router)
  app.use(async (err, req, res, next) => {
    if(err.code == 11000){
      res.status(403).send({
        message: '已存在条目，请不要重复创建'
      })
    } else {
      res.status(err.statusCode || 500).send({
        message: err.message
      })
    }
  })
}