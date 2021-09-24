/*
 * @Date: 2021-09-24 16:49:38
 * @LastEditors: AaronChu
 * @LastEditTime: 2021-09-24 17:55:10
 */
module.exports = app => {
  const express = require('express')
  const assert = require('http-assert')
  const Log = require('../../models/Log')
  const Category = require('../../models/Category')
  // 登录校验中间件
  const auth = require('../../middleware/auth')
  // 添加用户记录中间件(一定要放在auth之后)
  const actions = require('../../middleware/actionsRecord')
  const router = express.Router({
    mergeParams: true
  })

  // 获取日志的分类
  router.get('/type', auth(), async (req, res) => {
    const parent = await Category.findOne({
      name: '日志'
    })
    assert(parent, 406, '分类中不存在"日志"这一分类,请先创建以及创建其子分类.')
    const models = await Category.find({
      parent: parent._id
    }, {
      name: 1
    }).sort({
      updatedAt: -1
    })
    assert((models.length > 0), 406, '日志分类下不存在子分类,请先创建.')
    res.send(models)
  })

  // 新建日志
  router.post('/create', auth(), actions(), async (req, res) => {
    await Log.create(req.body)
    res.send({
      success: true
    })
  })


  // 获取日志列表
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
    if (req.query.type != '') {
      params['type'] = req.query.type
    }
    // 查出某个参数总条数
    console.log(params)
    const counts = await Log.countDocuments(params).exec()
    // 查出内容
    const models = await Log.find(params, {
      __v: 0
    }).populate({
      path: 'type',
      select: 'name'
    }).populate({
      path: 'creator',
      select: 'nickname'
    }).populate({
      path: 'updater',
      select: 'nickname'
    }).sort({
      createdAt: -1
    }).skip(start).limit(pageSize).exec() // 一页的内容
    res.send({
      data: models,
      counts: counts
    })
  })




  // 修改日志数据获取
  router.get('/info/:id', auth(), async (req, res) => {
    const model = await Log.findById(req.params.id, {
      _id: 0,
      content: 1,
      type: 1,
      status: 1,
      date: 1,
      version: 1
    })
    res.send(model)
  })

  // 修改日志
  router.put('/edit/:id', auth(), actions(), async (req, res) => {
    await Log.findByIdAndUpdate(req.params.id, req.body)
    res.send({
      success: true
    })
  })

  // 删除日志
  router.delete('/delete/:id', auth(), async (req, res) => {
    await Log.findByIdAndDelete(req.params.id)
    res.send({
      success: true
    })
  })

  app.use('/admin/api/log', router)
  app.use(async (err, req, res, next) => {
    res.status(err.statusCode || 500).send({
      message: err.message
    })
  })
}