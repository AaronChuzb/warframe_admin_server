/*
 * @Date: 2021-09-24 11:20:05
 * @LastEditors: AaronChu
 * @LastEditTime: 2021-09-28 15:41:11
 */
module.exports = app => {
  const express = require('express')
  const People = require('../../models/People')
  // 登录校验中间件
  const auth = require('../../middleware/auth')
  // 添加用户记录中间件(一定要放在auth之后)
  const actions = require('../../middleware/actionsRecord')
  const router = express.Router({
    mergeParams: true
  })
  // 新建鸣谢人员
  router.post('/create', auth(), actions(), async (req, res) => {
    await People.create(req.body)
    res.send({
      success: true
    })
  })
  // 获取鸣谢人员列表
  router.get('/list', auth(), async (req, res) => {
    const page = (parseInt(req.query.page) - 1 || 0) // 查询第几页，默认第一页
    const pageSize = (parseInt(req.query.pageSize) || 10) // 查询页大小，默认10
    const start = page * pageSize // 从什么地方开始查
    const reg = new RegExp(req.query.search, 'i');
    let params = {
        name: {
          $regex: reg
        },
      }
    // 查出某个参数总条数
    const counts = await People.countDocuments({
      $or: [params]
    }).exec()
    // 查出内容
    const models = await People.find({
      $or: [params]
    }, { __v: 0 }).populate({ path: 'creator', select: 'nickname' }).populate({ path: 'updater', select: 'nickname' }).sort(JSON.parse(req.query.sort)).skip(start).limit(pageSize).exec() // 一页的内容
    res.send({
      data: models,
      counts: counts
    })
  })
  // 获取鸣谢人员信息
  router.get('/info/:id', auth(), async (req, res) => {
    const model = await People.findById(req.params.id, {__v: 0, createdAt:0, updatedAt: 0})
    res.send(model)
  })
  // 修改鸣谢人员信息
  router.put('/change/:id', auth(), actions(), async (req, res) => {
    await People.findByIdAndUpdate(req.params.id, req.body)
    res.send({success: true})
  })

  // 删除鸣谢人员
  router.delete('/delete/:id', auth(), async (req, res) => {
    await People.findByIdAndDelete(req.params.id)
    res.send({
      success: true
    })
  })

  app.use('/admin/api/people', router)
  app.use(async (err, req, res, next) => {
    if(err.code == 11000){
      res.status(403).send({
        message: '已存在该人员，请不要重复添加'
      })
    } else {
      res.status(err.statusCode || 500).send({
        message: err.message
      })
    }
  })
}