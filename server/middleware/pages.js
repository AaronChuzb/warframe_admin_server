/*
 * @Date: 2021-08-26 09:58:03
 * @LastEditors: AaronChu
 * @LastEditTime: 2021-08-26 10:03:22
 */
// 分页数据
module.exports = () =>{
  return async (req, res, next)=>{
    const page = (parseInt(req.query.page) - 1 || 0) // 查询第几页，默认1
    const pageSize = (parseInt(req.query.pageSize) || 10) // 查询页大小，默认10
    const start = page * pageSize // 从什么地方开始查
    const counts = await req.Model.countDocuments(req.find).exec() // 查出某个参数总条数
    req.page = page
    req.pageSize = pageSize
    req.start = start
    req.counts = counts
    next()
  }
}