/*
 * @Date: 2021-08-26 11:56:37
 * @LastEditors: AaronChu
 * @LastEditTime: 2021-08-27 18:23:36
 */
module.exports = () => {
  return async (req, res, next) => {
    if (req.query.option) { // 先判断需不需要特殊查询，不需要直接下一步走常规查询
      let option = req.query.option
      if (option == 'category') { // 分类列表
        const models = await req.Model.find(req.find).populate('creator').populate('updater').populate('parent').skip(req.start).limit(req.pageSize).exec() // 一页的内容
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