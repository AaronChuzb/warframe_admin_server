/*
 * @Date: 2021-09-24 10:15:20
 * @LastEditors: AaronChu
 * @LastEditTime: 2021-09-28 15:41:41
 */
module.exports = app => {
  const express = require('express')
  const assert = require('http-assert')
  const Remain = require('../../models/Remain')
  const Suggest = require('../../models/Suggest')
  const People = require('../../models/People')
  const Log = require('../../models/Log')
  const About = require('../../models/About')
  const Part = require('../../models/Part')
  const router = express.Router({
    mergeParams: true
  })

  // 提交反馈
  router.post('/suggest', async (req, res) => {
    await Suggest.create(req.body)
    res.send({
      message: '提交反馈成功，祝您武运昌隆。'
    })
  })
  // 数据统计
  router.get('/count', async (req, res) => {
    const remain = await Remain.countDocuments()
    const part = await Part.countDocuments()
    res.send({
      remain,
      part
    })
  })
  // 关于富文本
  router.get('/about', async (req, res) => {
    const model = await About.findOne({}, {
      text: 1
    })
    res.send(model)
  })

  // 鸣谢人员名单
  router.get('/people', async (req, res) => {
    const page = (parseInt(req.query.page) - 1 || 0) // 查询第几页，默认第一页
    const pageSize = (parseInt(req.query.pageSize) || 10) // 查询页大小，默认10
    const start = page * pageSize // 从什么地方开始查
    const reg = new RegExp(req.query.search, 'i'); // 查询通配符
    const paramas = {
      $or: [{
        name: {
          $regex: reg
        }
      }]
    }
    // 查出某个参数总条数
    const counts = await People.countDocuments(paramas).exec()
    const models = await People.find(paramas, {
        __v: 0,
        _id: 0,
        createdAt: 0,
        updatedAt: 0
      })
      .sort({
        rank: -1 // rank越大越靠前
      })
      .skip(start)
      .limit(pageSize)
      .exec() // 一页的内容
    res.send({
      models,
      counts
    })
  })

  // 日志列表
  router.get('/logs', async (req, res) => {
    const page = (parseInt(req.query.page) - 1 || 0) // 查询第几页，默认第一页
    const pageSize = (parseInt(req.query.pageSize) || 10) // 查询页大小，默认10
    const start = page * pageSize // 从什么地方开始查
    const reg = new RegExp(req.query.search, 'i'); // 查询通配符
    const paramas = {
      $or: [{
        content: {
          $regex: reg
        }
      }, {
        version: {
          $regex: reg
        }
      }]
    }
    // 查出某个参数总条数
    const counts = await Log.countDocuments(paramas).exec()
    const models = await Log.find(paramas, {
        __v: 0,
        _id: 0,
        createdAt: 0,
        updatedAt: 0
      })
      .sort({
        createdAt: -1
      })
      .skip(start)
      .limit(pageSize)
      .exec() // 一页的内容
    res.send({
      models,
      counts
    })
  })




  app.use('/app/api/mine', router)
  app.use(async (err, req, res, next) => {
    res.status(err.statusCode || 500).send({
      message: err.message
    })
  })
}