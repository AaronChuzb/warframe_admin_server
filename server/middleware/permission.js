/*
 * @Date: 2021-10-11 15:35:30
 * @LastEditors: AaronChu
 * @LastEditTime: 2021-10-11 15:37:37
 */
module.exports = () =>{
  const assert = require('http-assert')
  return async(req, res, next)=>{
    assert((req.user.id = '61250a30e66c9709dc2082bb'), '关联性特别强的数据，只有超级管理员能删除', 403)
    await next()
  }
}