/*
 * @Date: 2021-09-29 14:57:06
 * @LastEditors: AaronChu
 * @LastEditTime: 2021-09-29 15:14:44
 */
// 别名转换
module.exports = () => {
  const Alias = require('../models/Alias')
  return async (req, res, next) => {
    // 先挂载避免后续访问变量出现未定义
    req.realName = ''
    if (req.query.search != '') {
      const reg = new RegExp(req.query.search, 'i'); // 查询通配符
      const alias = await Alias.findOne({
        alias: {
          $regex: reg
        }
      }, {
        __v: 0,
        createdAt: 0,
        updatedAt: 0,
        creator: 0,
        updater: 0,
        _id: 0
      })
      // 如果有匹配的别名，将真正的名称挂载到req上
      if (alias) {
        req.realName = alias.name
      }
    }
    next()
  }
}