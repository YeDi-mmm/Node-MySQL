const mysql = require('mysql');
const { BaseUrl, BaseName, user, password } = require('../config.json');
// 使用连接池方式（官方是推荐）
//创建连接池（内部自动创建10个（默认）连接对象，在不需要时自动回收）
var pool = mysql.createPool({
  host: BaseUrl, // 数据库地址
  user,  // 数据库用户名
  password, // 数据库链接密码
  // connectionLimit: 5, // 最大连接数
  database: BaseName, // 当前链接的数据库名称
  multipleStatements: true, // 允许每个mysql语句有多条查询.使用它时要非常注意，因为它很容易引起sql注入攻击(默认:false).
});

function query(sql) {
  return new Promise((resolve, reject) => {
    pool.query(sql, (error, results, fields) => {
      if (error) {
        reject(error)
      };
      resolve(results);
    });
  })
}

module.exports = query;