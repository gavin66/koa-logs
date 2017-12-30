# koa-logs
简单的日志存储 Web 应用



## 依赖

* 需安装 mongoDB 客户端

* node >= 7.6.0

  ​

## 安装&使用

```javascript
git clone https://github.com/gavin66/koa-logs.git

npm install

// 开启 Web 服务
node app.js
```

* 插入一条日志

  uri: `/logs`

  method: `post`

  param:

  *  `data` => json 字符串,里面的 key 需要在配置文件中配置
  * `table` => 插入哪张表,文件中配置

  response:

  * `code=0` 成功
  * `code=1`失败

![](https://raw.githubusercontent.com/gavin66/koa-logs/master/doc/p1.png)



## 配置

修改配置文件`config.js`以适用你自己的应用

```javascript
const config = {
  app_port: '3000', // 应用开启端口
  db_host: '127.0.0.1', // mongoDB IP 地址
  db_port: '27017', // 端口
  db_username: 'root', // 用户名
  db_password: '123456', // 密码
  db_name: 'koa_logs', // 数据库
  db_authentication_database: 'admin', // 验证使用的数据库
  db_table_schemas: { // 表描述
    logs_table: { // key 表的名称
      app: String, // key: type  字段: 类型
      name: String,
      created_time: String
    }
  }
}
```



