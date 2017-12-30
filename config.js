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

module.exports = config
