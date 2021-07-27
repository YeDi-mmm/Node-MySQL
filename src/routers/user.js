const express = require('express');

const Router = express.Router();

const { mysql: query } = require('../database');

const colName = 'user' // 数据库表名

const { formatData, token } = require('../utils')

const jwt = require('jsonwebtoken'); // Token的生成与校验

// 注册
Router.post('/reg', async (req, res) => {
  let result
  let creationTime = new Date().getTime()
  let { username, password } = req.body;
  let sql = `insert into ${colName} (username, password, creationTime) values ('${username}', '${password}', '${creationTime}')`

  try {
    await query(sql);
    result = formatData({ code: 2000 })
  } catch (error) {
    result = formatData({ code: -1001 })
  }

  res.send(result);
})

// 登录
Router.post('/login', async (req, res) => {
  let result
  let { username, password } = req.body;
  let loginSql = `select * from ${colName} where username='${username}' AND password='${password}'`
  // 执行登录
  let userResult = await query(loginSql)

  if (userResult.length > 0) {
    // 创建token
    let Authorization = token.create(username)
    // 获取token过期时间
    let { exp } = jwt.decode(Authorization)
    // 保存登录token过期时间
    let setSignInTime = `update ${colName} set SignInTime='${exp}' where username='${username}'`
    await query(setSignInTime);
    // 返回状态
    result = formatData({ code: 2000, token: Authorization })
  } else {
    result = formatData({ code: -1002 })
  }
  
  res.send(result);
})

// 退出登陆
Router.post('/logout', async (req, res) => {
  let { token: checkToken } = req.body
  let result
  // 校验用户携带token是否可用
  if (await token.checkTokenAvailable(checkToken, query, colName)) {
    // 获取token用户名
    let { data } = jwt.decode(checkToken)
    let logoutDate = new Date().getTime()
    // 退出登陆，更新用户token过期时间
    let setSignInTime = `update ${colName} set SignInTime='${logoutDate}' where username='${data}'`
    await query(setSignInTime);
    // 返回状态
    result = formatData({ code: 2000 })
  } else {
    result = formatData({ code: checkToken ? -1000 : -1003 })
  }

  res.send(result);
})

module.exports = Router;