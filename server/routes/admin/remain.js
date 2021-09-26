/*
 * @Date: 2021-09-14 14:40:38
 * @LastEditors: AaronChu
 * @LastEditTime: 2021-09-26 17:33:25
 */
module.exports = app => {
  const express = require('express')
  const assert = require('http-assert')
  const Remain = require('../../models/Remain')
  const Category = require('../../models/Category')
  const Part = require('../../models/Part')
  const User = require('../../models/User')
  // 登录校验中间件
  const auth = require('../../middleware/auth')
  // 添加用户记录中间件(一定要放在auth之后)
  const actions = require('../../middleware/actionsRecord')
  const router = express.Router({
    mergeParams: true
  })

  // 获取遗物的分类
  router.get('/type', auth(), async (req, res) => {
    const parent = await Category.findOne({
      name: '遗物'
    })
    assert(parent, 406, '分类中不存在"遗物"这一分类,请先创建以及创建其子分类.')
    const models = await Category.find({
      parent: parent._id
    }, {
      name: 1
    }).sort({
      updatedAt: -1
    })
    assert((models.length > 0), 406, '遗物分类下不存在子分类,请先创建.')
    res.send(models)
  })

  // 获取遗物部件
  router.get('/search', auth(), async (req, res) => {
    const reg = new RegExp(req.query.search, 'i'); // 查询通配符
    // 查出内容
    const models = await Part.find({
      $or: [{
        name: {
          $regex: reg
        },
      }]
    }, {
      _id: 1,
      name: 1
    }).sort({
      updatedAt: -1
    }).limit(10).exec()
    res.send(models)
  })


  // 新建遗物
  router.post('/create', auth(), actions(), async (req, res) => {
    await Remain.create(req.body)
    res.send({
      success: true
    })
  })


  // 获取遗物列表
  router.get('/list', auth(), async (req, res) => {
    const page = (parseInt(req.query.page) - 1 || 0) // 查询第几页，默认第一页
    const pageSize = (parseInt(req.query.pageSize) || 10) // 查询页大小，默认10
    const start = page * pageSize // 从什么地方开始查
    const reg = new RegExp(req.query.search, 'i'); // 查询通配符
    const users = await User.find({},{nickname: 1}) // 根据用户遗物
    let params = {
      $and: []
    }
    // 最后根据部件来
    if(req.query.search != ''){
      const parts = await Part.find({
        name: {
          $regex: reg
        }
      },{_id: 1})
      let arr = parts.map(e=>{
        return e._id
      })
      let parent = {
        $or: []
      }
      let keys = ['copper_1', 'copper_2','copper_3','silver_1','silver_2','gold',]
      keys.forEach(item=>{
        let child = {}
        child[item] = { $in: arr }
        parent.$or.push(child)
      })
      parent.$or.push({
        name: {
          $regex: reg
        }
      })
      params.$and.push(parent)
      temp = parent
    } else {
      params.$and.push({
        name: {
          $regex: reg
        }
      })
    }
    if(req.query.user != ''){
      let obj = {}
      obj['updater'] = req.query.user
      params.$and.push(obj)
    }
    if(req.query.type != ''){
      let obj = {}
      obj['type'] = req.query.type
      params.$and.push(obj)
    }
    if (req.query.stock != ''){
      let stock
      if(req.query.stock == '1'){
        stock = true
      } else {
        stock = false
      }
      let obj = {}
      obj['stock'] = stock
      params.$and.push(obj)
    }
    // 查出某个参数总条数
    console.log(params)
    const counts = await Remain.countDocuments(params).exec()
    // 查出内容
    const models = await Remain.find(params, { _id: 1, name: 1, createdAt: 1, updatedAt: 1 }).populate({ path: 'type',  select: 'name'}).populate({ path: 'creator', select: 'nickname' }).populate({ path: 'updater', select: 'nickname' }).sort(JSON.parse(req.query.sort)).skip(start).limit(pageSize).exec() // 一页的内容
    res.send({
      data: models,
      counts: counts,
      userOptions: users
    })
  })

  


  // 修改遗物数据获取
  router.get('/info/:id', auth(), async (req, res) => {
    const model = await Remain.findById(req.params.id, {
      _id: 0,
      name: 1,
      type: 1,
      stock: 1,
      getways: 1,
      contribute: 1
    }).populate({
      path: 'copper_1',
      select: 'name'
    }).populate({
      path: 'copper_2',
      select: 'name'
    }).populate({
      path: 'copper_3',
      select: 'name'
    }).populate({
      path: 'silver_1',
      select: 'name'
    }).populate({
      path: 'silver_2',
      select: 'name'
    }).populate({
      path: 'gold',
      select: 'name'
    }).populate({
      path: 'creator',
      select: '_id'
    }).populate({
      path: 'updater',
      select: '_id'
    })
    res.send(model)
  })

  // 修改遗物
  router.put('/edit/:id', auth(), actions(), async (req, res) => {
    await Remain.findByIdAndUpdate(req.params.id, req.body)
    res.send({
      success: true
    })
  })

  // 删除遗物
  router.delete('/delete/:id', auth(), async (req, res) => {
    await Remain.findByIdAndDelete(req.params.id)
    res.send({
      success: true
    })
  })

  app.use('/admin/api/remain', router)
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