/*
 * @Date: 2021-09-02 14:49:43
 * @LastEditors: AaronChu
 * @LastEditTime: 2021-10-10 16:54:04
 */
// 为新建和更新添加操作者
module.exports = () => {
  return async (req, res, next) => {
    if (req.method === 'POST') {
      req.body.creator = req.user._id
      req.body.updater = req.user._id
    } else if (req.method === 'PUT') {
      console.log(req.body.creator)
      if(null != req.body.creator._id){
        req.body.creator = req.body.creator._id
      }
      req.body.updater = req.user._id
    }
    next()
  }
}