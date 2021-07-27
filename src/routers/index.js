const express = require('express')
// 引用express服务器路由
const Router = express.Router()

const { formatData, token: Authorization } = require('../utils')

Router.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type, Content-Length, Authorization, Accept, X-Requested-With");
  res.header("Access-Control-Allow-Methods", "PUT, PATCH, POST, GET, DELETE, OPTIONS");

  // 跨域请求CORS中的预请求
  if (req.method === "OPTIONS") {
    res.sendStatus(200); /*让options请求快速返回*/
  } else {
    next();
  }
})

// express.static 快速托管静态资源的内置中间件，例如： HTML 文件、图片、CSS 样式等（无兼容性）
// express.json 解析 JSON 格式的请求体数据（有兼容性，仅在 4.16.0+ 版本中可用）
// express.urlencoded 解析 URL-encoded 格式的请求体数据（有兼容性，仅在 4.16.0+ 版本中可用）
Router.use(express.urlencoded({ extended: true }), express.json()); //推导：内部自动调用next

const userRouter = require('./user');
Router.use('/user', userRouter);

Router.get('/verify', (req, res) => {
  let token = req.get('token');
  // 校验token有效性
  let result = Authorization.verify(token);
  res.send(formatData({ code: result ? 2000 : -1000 }))
});

module.exports = Router