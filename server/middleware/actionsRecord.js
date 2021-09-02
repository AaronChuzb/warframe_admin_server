/*
 * @Date: 2021-09-02 14:49:43
 * @LastEditors: AaronChu
 * @LastEditTime: 2021-09-02 15:01:00
 */
// 为新建和更新添加操作者
module.exports = () => {
  return async (req, res, next) => {
    if (req.method === 'POST') {
      req.body.creator = req.user._id
      req.body.updater = req.user._id
    } else if (req.method === 'PUT') {
      req.body.updater = req.user._id
    }
    next()
  }
}