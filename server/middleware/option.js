/*
 * @Date: 2021-08-26 11:56:37
 * @LastEditors: AaronChu
 * @LastEditTime: 2021-08-29 00:57:49
 */
module.exports = () => {
  return async (req, res, next) => {
    if (req.query.option) { // 先判断需不需要特殊查询，不需要直接下一步走常规查询
      let option = req.query.option
      // 查询单个遗物
      if(option == 'remain'){
        const model = await req.Model.findById(req.params.id).populate('type').populate('cu1').populate('cu2').populate('cu3').populate('ag1').populate('ag2').populate('au').populate('creator').populate('updater')
        res.send(model)
      }
    } else {
      next()
    }
  }
}