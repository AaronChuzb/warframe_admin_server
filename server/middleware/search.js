/*
 * @Date: 2021-08-24 13:42:17
 * @LastEditors: AaronChu
 * @LastEditTime: 2021-08-25 17:31:12
 */

module.exports = () =>{
  return async (req, res, next)=>{
    const search = JSON.parse(req.query.search || '{}') // 查询的参数，默认{}
    const reg = new RegExp(search.content, 'i');
    let feilds = []
    let find = {}
    if(search.feilds.length > 0){
      search.feilds.map((e)=>{
        let item = {}
        item[e] = { $regex : reg }
        feilds.push( item )
      })
      find =  { $or: feilds }
    }
    req.find = find
    await next()
  }
}