const express = require('express');
const allRouter = require('./src/routers');
const compression = require('compression')
const app = express();

// 启动服务器压缩
app.use(compression());

// 静态资源服务器
// app.use(express.static('./'));

app.use(allRouter);

app.listen(3838, () => {
  console.log(`server is running on port ${3838}`);
})