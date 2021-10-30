/*
 * @Date: 2021-10-30 23:10:47
 * @LastEditors: AaronChu
 * @LastEditTime: 2021-10-30 23:16:19
 */
module.exports = app => {
  const express = require('express')
  const assert = require('http-assert')
  const Feed = require('../../models/Feed')
  // 登录校验中间件
  const auth = require('../../middleware/auth')
  // 添加用户记录中间件(一定要放在auth之后)
  const actions = require('../../middleware/actionsRecord')
  const router = express.Router({
    mergeParams: true
  })

  // 获取反馈内容列表
  router.get('/list', auth(), async (req, res) => {
    const page = (parseInt(req.query.page) - 1 || 0) // 查询第几页，默认第一页
    const pageSize = (parseInt(req.query.pageSize) || 10) // 查询页大小，默认10
    const start = page * pageSize // 从什么地方开始查
    const reg = new RegExp(req.query.search, 'i'); // 查询通配符
    let params = {
      content: {
        $regex: reg
      }
    }
    if (req.query.status != '') {
      params['status'] = parseInt(req.query.status)
    }
    // 查出某个参数总条数
    const counts = await Feed.countDocuments(params).exec()
    // 查出内容
    const models = await Feed.find(params, {
      __v: 0
    }).sort({
      createdAt: -1
    }).skip(start).limit(pageSize).exec() // 一页的内容
    res.send({
      data: models,
      counts: counts
    })
  })

  // 删除反馈内容
  router.delete('/delete/:id', auth(), async (req, res) => {
    await Feed.findByIdAndDelete(req.params.id)
    res.send({
      success: true
    })
  })

  // 标记处理
  router.put('/change/:id', auth(), async (req, res) => {
    await Feed.findByIdAndUpdate(req.params.id, req.body)
    res.send({
      success: true
    })
  })

  app.use('/admin/api/feed', router)
  app.use(async (err, req, res, next) => {
    res.status(err.statusCode || 500).send({
      message: err.message
    })
  })
}