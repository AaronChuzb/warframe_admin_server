/*
 * @Date: 2021-08-22 21:39:51
 * @LastEditors: AaronChu
 * @LastEditTime: 2021-10-25 17:54:19
 */

function getRandomCode(length) {
  if (length > 0) {
    var data = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
    var nums = "";
    for (var i = 0; i < length; i++) {
      var r = parseInt(Math.random() * 61);
      nums += data[r];
    }
    return nums;
  } else {
    return false;
  }
}

function genID(length) {
  return (getRandomCode(length - 13) + new Date().getTime());
}


module.exports = {
  genID
}
