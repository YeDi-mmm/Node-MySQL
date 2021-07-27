const jwt = require('jsonwebtoken'); // Token的生成与校验
let { secret } = require('../config.json');
/**
 * 创建token
 * @param {String} data 加密数据
 * @param {Number} expiresIn 有效期（单位:s）
 */
function create(data, expiresIn = 60 * 60 * 24 * 1) {
  let token = jwt.sign({ data }, secret, {
    expiresIn
  });
  return token;
}

// 检查用户token是否可用
function verify(token) {
  let res;
  try {
    let result = jwt.verify(token, secret);
    res = true;
  } catch(err) {
    res = false;
  }
  
  return res;
}

/**
 * 检查用户token在非过期时间是否已经退出登陆
 * @param {String} token 用户token
 * @param {Function} query 当前连接的数据库
 * @param {String} colName 当前的数据库表名
 */
async function checkTokenAvailable(token, query, colName) {
  if (verify(token)) {
    let { data, exp } = jwt.decode(token);
    let sql = `select username from ${colName} where username='${data}' AND SignInTime='${exp}'`;
    let result = await query(sql);
    return result.length > 0 ? true : false
  } else {
    return false
  }
}

module.exports = {
  create,
  verify,
  checkTokenAvailable
}