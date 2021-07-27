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