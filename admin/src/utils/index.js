/*
 * @Date: 2021-08-24 14:34:39
 * @LastEditors: AaronChu
 * @LastEditTime: 2021-08-24 23:06:12
 */
const util = {
  formatTime(time){
    const date = new Date(time); // 初始化日期
    const year = date.getFullYear(); //获取年份
    const month = date.getMonth() + 1; // 获取月份
    const day = date.getDate(); // 获取具体日
    const hour = date.getHours(); // 获取时
    const minutes = date.getMinutes(); // 获取分
    const seconds = date.getSeconds(); // 获取秒
    return year + '-' + month + '-' + day + ' ' +  hour + ':' + (minutes<10?('0'+minutes): minutes) + ':' + seconds
  }
}
export default util