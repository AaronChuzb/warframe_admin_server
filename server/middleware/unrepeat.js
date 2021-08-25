/*
 * @Date: 2021-08-25 15:10:03
 * @LastEditors: AaronChu
 * @LastEditTime: 2021-08-25 15:18:35
 */
module.exports = () =>{
  return async (req, res, next)=>{
    console.log(req.query)
    await next()
  }
}