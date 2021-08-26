/*
 * @Date: 2021-08-26 11:56:37
 * @LastEditors: AaronChu
 * @LastEditTime: 2021-08-26 13:12:59
 */
module.exports = () =>{
  return async (req, res, next) =>{
    if(req.query.option){ // 先判断需不需要特殊查询，不需要直接下一步走常规查询
      let option = req.query.option
      if(option == 'category'){ // 分类列表
        const models = await req.Model.find(req.find).populate('creator').populate('updater').populate('parent').skip(req.start).limit(req.pageSize).exec() // 一页的内容
        res.send({
          data: models,
          counts: req.counts
        })
      }
    } else {
      next()
    }
  }
}