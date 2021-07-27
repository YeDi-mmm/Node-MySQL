## 配置WNMP环境

> 下载MySQL：`https://dev.mysql.com/downloads/mysql/`
> 文件自行下载，直接开始安装配置环节。

### 1. 安装 MySQL

+ 配置文件

解压后，在 MySQL 根目录下新建 `data` 文件夹和 `my.ini` 配置文件，其中 `my.ini`
配置文件内容如下，其他参数可自行配置：

```mysql
[mysql]

# 设置mysql客户端默认字符集
default-character-set=utf8 

[mysqld]

#设置3306端口
port = 3306 

# 设置mysql的安装目录
basedir=E:\PHPEnv\mysql5730

# 设置mysql数据库的数据的存放目录
datadir=E:\PHPEnv\mysql5730\data

# 允许最大连接数
max_connections=200

# 服务端使用的字符集默认为8比特编码的latin1字符集
character-set-server=utf8

# 创建新表时将使用的默认存储引擎
default-storage-engine=INNODB
```
+ 初始化和安装

使用管理员身份进入 `cmd` ，进入 MySQL 安装目录下的 `bin` 目录，依次输入以下命令：

```
mysqld --initialize

mysqld --install
```
其中，`mysqld --initialize`会进行初始化，在 `data` 目录下生成相关文件；在初始化成功后使用 `mysqld --install` 命令进行安装。

+ 启动服务和修改密码

```mysql
# 启动服务
net start mysql

# 登录后立即修改密码
# 打开 .err 文件，找到 A temporary password is generated for root@localhost: yourpassword

# 登录
mysql -u root -p yourpassword

# 修改密码
set password for root@localhost = password('your password');
```

+ 更改加密方式（node-MySQL不支持MySQL8.0版本以上的加密方式，需更改加密方式，或安装低版本MySQL[安装低版本，此操作无需执行]）

```mysql
# 更改​​用户帐户的类型以使用旧的身份验证插件
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'MyNewPass';

# 或创建一个使用相同插件的其他插件
CREATE USER 'foo'@'localhost' IDENTIFIED WITH mysql_native_password BY 'bar';
```

### 2. MySQL的安装配置
>请自行查找相关资料

### 3. 在Nodejs中使用MySQL

+ 安装MySQL模块
  
```install
# npm install mysql
```

+ 连接数据库
  + 使用连接对象方式
  ```database
    var mysql = require('mysql');

    // 创建连接对象，并配置参数
    var connection = mysql.createConnection({
      host     : 'localhost',
      user     : 'root',
      password : '',
      database : 'you-database-name'
    });

    // 连接数据库
    connection.connect();

    // 查询数据库
    connection.query('select * from you-table-name', function(error, results, fields) {
      if (error) throw error;
      console.log('The solution is: ', results);
    });

    // 关闭连接, 释放资源
    connection.end();
  ```

  + 使用连接池方式（官方推荐）
  
    >使用连接池，默认会在连接池中创建10个连接对象（connectionLimit），使用完成自动放回连接池，不需要手动关闭

    ```database
      var mysql = require('mysql');

      // 创建连接池
      var pool  = mysql.createPool({
        host     : 'localhost',
        user     : 'root',
        password : '',
        port: 80,
        database: 'you-database-name',
        multipleStatements: true
      });

      pool.query('select * from YouTableName', function(error, rows) {
        console.log(rows);
      });
    ```

  + 封装模块（sql语句）
    ```database
      // 配置参数
      module.exports = {
        query: sql => {
          return new Promise((resolve,reject) => {
            pool.query(sql, function(err, rows) {
              if(err) return reject(err);
              resolve(rows);
            });
          })
        }
      }
    ```

+ 数据库操作：
  
  > query(sql, callback)

  ```sql
    --增 `insert into <表名> [(<字段名1>[,..<字段名n > ])] values ( 值1 )[, (值n )];`
    insert into YouTableName (firstname, lastname, email) values ('val1', 'val2''val3');
  ```
  ```sql
    --删 `delete from <表名> where <条件>`

    --删除 YouTableName 表中id为1的数据
    DELETE FROM YouTableName where id = 1;

    --删除所有数据
    DELETE FROM YouTableName
  ```
  ```sql
    --改 `update <表名> set 字段=新值,… where 条件`

    --设置 YouTableName 表中id为1的name为youname
    update YouTableName set name='youname' where id = 1;
  ```
  ```sql
    --查 `select <字段1, 字段2, ...> from <表名> where <表达式>`

    --查看表 YouTableName 中所有数据
    select * from YouTableName;

    --查看表 YouTableName 中以id排序前10行数据
    select * from YouTableName order by id limit 0, 10;
  ```

* 条件控制语句: WHERE
  
  >SELECT * FROM tb_name WHERE id=3;

  - 相关条件控制符： 
    + =、>、<、<>、IN(1,2,3......)、BETWEEN a AND b
    + AND、OR、NOT
    + LIKE用法中      
      * %  匹配任意、 
      * _  匹配一个字符（可以是汉字）
  - 数量控制 LIMIT idx, qty
    + SELECT * FROM goods LIMIT 2, 5
  - 空值检测 IS NULL
  - 排序 ORDER BY
    - asc 升序（默认）
    - desc 降序