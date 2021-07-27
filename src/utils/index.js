const token = require('./token')
/**
 * @param {Number} code 状态码（）
 * 状态码：
 *  2000：成功，
 *  -1000：token错误，
 *  -1001：用户已存在,
 *  -1002: 用户名或密码错误
 *  -1003: 参数错误
 * @param {String} msg 提示消息
 * @param {Array} data 返回数据
 */
function formatData({ code = 2000, msg = 'success' , data = {}, token = '' } = {}) {
  switch (+code) {
    case -1000:
      msg = 'token错误！'
      break;
    case -1001:
      msg = '用户已存在'
      break;
    case -1002:
      msg = '用户名或密码错误'
      break;
    case -1003:
      msg = '参数错误'
      break;
    default:
      break;
  }

  return {
    code,
    msg,
    data,
    token
  }
}


module.exports = {
  formatData,
  token
}