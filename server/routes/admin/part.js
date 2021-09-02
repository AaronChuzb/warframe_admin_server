/*
 * @Date: 2021-09-02 14:12:56
 * @LastEditors: AaronChu
 * @LastEditTime: 2021-09-02 16:25:18
 */
module.exports = app => {
  const express = require('express')
  const Part = require('../../models/Part')
  // 登录校验中间件
  const auth = require('../../middleware/auth')
  // 添加用户记录中间件(一定要放在auth之后)
  const actions = require('../../middleware/actionsRecord')
  const router = express.Router({
    mergeParams: true
  })
  // 新建部件
  router.post('/create', auth(), actions(), async (req, res) => {
    await Part.create(req.body)
    res.send({
      success: true
    })
  })
  // 获取部件列表
  router.get('/list', auth(), async (req, res) => {
    const page = (parseInt(req.query.page) - 1 || 0) // 查询第几页，默认第一页
    const pageSize = (parseInt(req.query.pageSize) || 10) // 查询页大小，默认10
    const start = page * pageSize // 从什么地方开始查
    const reg = new RegExp(req.query.search, 'i');
    // 查出某个参数总条数
    const counts = await Part.countDocuments({
      $or: [{
        name: {
          $regex: reg
        }
      }]
    }).exec()
    // 查出内容
    const models = await Part.find({
      $or: [{
        name: {
          $regex: reg
        }
      }]
    }, { __v: 0 }).populate({ path: 'creator', select: 'nickname' }).populate({ path: 'updater', select: 'nickname' }).skip(start).limit(pageSize).exec() // 一页的内容
    res.send({
      data: models,
      counts: counts
    })
  })
  // 修改部件名
  router.put('/edit/:id', auth(), actions(), async (req, res) => {
    await Part.findByIdAndUpdate(req.params.id, req.body)
    res.send({success: true})
  })

  // 删除部件
  router.delete('/delete/:id', auth(), async (req, res) => {
    await Part.findByIdAndDelete(req.params.id)
    res.send({
      success: true
    })
  })

  app.use('/admin/api/part', router)
}