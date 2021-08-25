/*
 * @Date: 2021-08-22 02:36:55
 * @LastEditors: AaronChu
 * @LastEditTime: 2021-08-25 15:12:49
 */
module.exports = () =>{
  return async (req, res, next)=>{
    const modelName = await require('inflection').classify(req.params.resource)
    req.Model = require(`../models/${modelName}`)
    next()
  }
}