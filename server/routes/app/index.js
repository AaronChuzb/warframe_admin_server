/*
 * @Date: 2021-09-20 20:15:42
 * @LastEditors: AaronChu
 * @LastEditTime: 2021-10-28 17:50:38
 */
module.exports = app => {
  const express = require('express')
  const assert = require('http-assert')
  const Remain = require('../../models/Remain')
  const Category = require('../../models/Category')
  const Part = require('../../models/Part')
  // 别名转换中间件
  const trans = require('../../middleware/trans')
  const router = express.Router({
    mergeParams: true
  })

  // 获取遗物的分类
  router.get('/type', async (req, res) => {
    const parent = await Category.findOne({
      name: '遗物'
    })
    assert(parent, 406, '暂无分类信息')
    const models = await Category.find({
      parent: parent._id
    }, {
      name: 1
    }).sort({
      updatedAt: 1
    })
    assert((models.length > 0), 406, '暂无子分类信息')
    res.send(models)
  })

  // 获取遗物列表
  router.get('/list', trans(), async (req, res) => {
    const page = (parseInt(req.query.page) - 1 || 0) // 查询第几页，默认第一页
    const pageSize = (parseInt(req.query.pageSize) || 10) // 查询页大小，默认10
    const start = page * pageSize // 从什么地方开始查
    const reg = new RegExp(req.query.search, 'i') // 查询通配符
    let searchRealName = req.query.search
    let params = {
      $and: []
    }
    let aliasParams = {
      $or: [{
        name: {
          $regex: reg
        }
      }]
    }
    // 存在别名先处理别名参数
    if (req.realName != '') {
      searchRealName = req.realName
      const aliasReg = new RegExp(req.realName, 'i')
      aliasParams = {
        $or: [{
          name: {
            $regex: reg
          }
        }, {
          name: {
            $regex: aliasReg
          }
        }]
      }
    }
    // 根据部件来
    if (req.query.search != '') {
      // 别名参数只作用于部件，不作用与遗物名称
      const parts = await Part.find(aliasParams, {
        _id: 1
      })
      let arr = parts.map(e => {
        return e._id
      })
      let parent = {
        $or: []
      }
      let keys = ['copper_1', 'copper_2', 'copper_3', 'silver_1', 'silver_2', 'gold', ]
      keys.forEach(item => {
        let child = {}
        child[item] = {
          $in: arr
        }
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
    if (req.query.type != '') {
      let obj = {}
      obj['type'] = req.query.type
      params.$and.push(obj)
    }
    
    // 兼容旧接口
    if (req.query.stock != '') {
      let stock
      if (req.query.stock == '1') {
        stock = true
      } else {
        stock = false
      }
      let obj = {}
      obj['stock'] = stock
      params.$and.push(obj)
    }
    // 兼容旧接口
    if (req.query.status != undefined && req.query.status != '') {
      let obj = {}
      obj['status'] = req.query.status
      params.$and.push(obj)
    }
    // 查出某个参数总条数
    const counts = await Remain.countDocuments(params).exec()
    // 查出内容
    const models = await Remain.find(params, {
        updater: 0,
        creator: 0,
        __v: 0,
        createdAt: 0,
        updatedAt: 0,
        getways: 0
      })
      .populate({
        path: 'type',
        select: {
          name: 1,
          _id: 0
        }
      })
      .populate({
        path: 'copper_1',
        select: {
          name: 1,
          price: 1,
          _id: 0
        }
      }).populate({
        path: 'copper_2',
        select: {
          name: 1,
          price: 1,
          _id: 0
        }
      }).populate({
        path: 'copper_3',
        select: {
          name: 1,
          price: 1,
          _id: 0
        }
      }).populate({
        path: 'silver_1',
        select: {
          name: 1,
          price: 1,
          _id: 0
        }
      }).populate({
        path: 'silver_2',
        select: {
          name: 1,
          price: 1,
          _id: 0
        }
      }).populate({
        path: 'gold',
        select: {
          name: 1,
          price: 1,
          _id: 0
        }
      })
      .sort({
        createdAt: 1
      })
      .skip(start)
      .limit(pageSize)
      .exec() // 一页的内容
    res.send({
      data: models,
      counts: counts,
      pageLen: models.length,
      realName: searchRealName
    })
  })
  router.get('/info/:id', async (req, res) => {
    const model = await Remain.findById(req.params.id, {
        _id: 0,
        __v: 0,
        creator: 0,
        updater: 0
      })
      .populate({
        path: 'type',
        select: {
          name: 1,
          _id: 0
        }
      })
      .populate({
        path: 'copper_1',
        select: {
          name: 1,
          price: 1,
          _id: 0
        }
      }).populate({
        path: 'copper_2',
        select: {
          name: 1,
          price: 1,
          _id: 0
        }
      }).populate({
        path: 'copper_3',
        select: {
          name: 1,
          price: 1,
          _id: 0
        }
      }).populate({
        path: 'silver_1',
        select: {
          name: 1,
          price: 1,
          _id: 0
        }
      }).populate({
        path: 'silver_2',
        select: {
          name: 1,
          price: 1,
          _id: 0
        }
      }).populate({
        path: 'gold',
        select: {
          name: 1,
          price: 1,
          _id: 0
        }
      })
    res.send(model)
  })
  app.use('/app/api/index', router)
  app.use(async (err, req, res, next) => {
    res.status(err.statusCode || 500).send({
      message: err.message
    })
  })
}