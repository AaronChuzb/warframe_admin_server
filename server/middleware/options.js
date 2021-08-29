/*
 * @Date: 2021-08-26 11:56:37
 * @LastEditors: AaronChu
 * @LastEditTime: 2021-08-29 16:39:22
 */
module.exports = () => {
  return async (req, res, next) => {
    if (req.query.option) { // 先判断需不需要特殊查询，不需要直接下一步走常规查询
      let option = req.query.option
      if (option == 'category') { // 分类列表
        const models = await req.Model.find(req.find).populate('creator').populate('updater').populate('parent').skip(req.start).limit(req.pageSize).sort({updatedAt: -1}).exec() // 一页的内容
        res.send({
          data: models,
          counts: req.counts
        })
      } else if (option == 'remainType') { // 遗物分类查询
        const Category = require('../models/Category')
        const parent = await Category.find({
          name: req.search.content
        })
        const _id = parent[0]._id
        const models = await req.Model.find({
          parent: _id
        }).skip(req.start).limit(req.pageSize).exec() // 一页的内容
        res.send({
          data: models,
          counts: req.counts
        })
      } else if (option == 'resourceTypeAndFrom') { // 资源分类和来源查询
        const type = await req.Model.findOne({
          name: req.search.content.split('-')[0]
        }, {_id: 1})
        const from = await req.Model.findOne({
          name: req.search.content.split('-')[1]
        }, {_id: 1})
        const types = await req.Model.find({
          parent: type._id
        }, {_id: 1, name: 1}).skip(req.start).limit(req.pageSize).exec() // 类型一页的内容
        const froms = await req.Model.find({
          parent: from._id
        }, {_id: 1, name: 1}).skip(req.start).limit(req.pageSize).exec() // 来源一页的内容
        res.send({
          data: { types, froms },
          counts: req.counts
        })
      } else if (option == 'WarframeType') { // 战甲分类查询
        const Category = require('../models/Category')
        const parent = await Category.find({
          name: req.search.content
        })
        const _id = parent[0]._id
        const models = await req.Model.find({
          parent: _id
        }).skip(req.start).limit(req.pageSize).exec() // 一页的内容
        res.send({
          data: models,
          counts: req.counts
        })
      } else if (option == 'remain') {
        // 先去遗物表找
        const remain = await req.Model.find(req.find).skip(req.start).limit(req.pageSize).exec()
        // 如果有数据
        if (remain.length > 0) {
          res.send({
            data: remain,
            counts: req.counts
          })
        } else { // 如果没有数据根据部件找
          const Part = require('../models/Part')
          const parts = await Part.find(req.find, {
            _id: 1
          })
          let arr = []
          parts.forEach(item => {
            arr.push(item._id.toString())
          })
          console.log(arr)
          const models = await req.Model.find({
            $or: [{
              cu1: {
                $in: arr
              }
            }, {
              cu2: {
                $in: arr
              }
            }, {
              cu3: {
                $in: arr
              }
            }, {
              ag1: {
                $in: arr
              }
            }, {
              au: {
                $in: arr
              }
            }]
          }).skip(req.start).limit(req.pageSize).exec()
          res.send({
            data: models,
            counts: req.counts
          })
        }
      }
    } else {
      next()
    }
  }
}