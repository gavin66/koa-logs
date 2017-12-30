const mongoose = require('mongoose')
const conf = require('./config')
const util = require('util')
const mongoUri = util.format('mongodb://%s:%s@%s:%s/%s?authSource=%s', conf.db_username, conf.db_password, conf.db_host, conf.db_port, conf.db_name, conf.db_authentication_database)
const mongoOptions = {useMongoClient: true}

const connection = mongoose.connect(mongoUri, mongoOptions)
connection.on('error', err => {
  console.error('错误信息:' + err)
})
// const mongoEvents = ['connecting', 'connected', 'open', 'disconnecting', 'disconnected', 'close', 'reconnected', 'error', 'fullsetup', 'all']
// mongoEvents.forEach(event => {
//   mongoose.connection.on(event, function () {
//     console.log('Mongoose event: ' + event)
//   })
// })

const DB = function () {
  this.models = {}
}

/**
 * 初始化mongoose model
 * @param tableName 表名称(集合名称)
 */
DB.prototype.model = function (tableName) {
  if (!tableName) return
  if (!conf.db_table_schemas[tableName]) {
    console.error('No table structure')
    return false
  }

  if (!this.models[tableName]) {
    // 构建用户信息表结构
    let schema = new mongoose.Schema(conf.db_table_schemas[tableName])
    // 构建model
    this.models[tableName] = mongoose.model(tableName, schema)
  }
  return this.models[tableName]
}

/**
 * 保存数据
 * @param tableName 表名
 * @param fields 表数据
 * @param callback 回调
 */
DB.prototype.save = function (tableName, fields) {
  if (!fields) {
    console.error('Field is not allowed for null')
    return false
  }

  let errNum = 0
  for (let i in fields) {
    if (!conf.db_table_schemas[tableName][i]) errNum++
  }
  if (errNum > 0) {
    console.error('Wrong field name')
    return false
  }
  let Model = this.model(tableName)
  let result = false
  if (Model !== false) {
    result = new Model(fields).save()
  }

  return result
}

// /**
//  * 更新数据
//  * @param tableName 表名
//  * @param conditions 更新需要的条件 {_id: id, user_name: name}
//  * @param updateFields 要更新的字段 {age: 21, sex: 1}
//  * @param callback 回调方法
//  */
// DB.prototype.update = function (tableName, conditions, updateFields, callback) {
//   if (!updateFields || !conditions) {
//     if (callback) callback({msg: 'Parameter error'})
//     return
//   }
//   let nodeModel = this.getConnection(tableName)
//   nodeModel.update(conditions, {$set: updateFields}, {multi: true, upsert: true}, function (err, res) {
//     if (err) {
//       if (callback) {
//         callback(err)
//       }
//     } else {
//       if (callback) {
//         callback(null, res)
//       }
//     }
//   })
// }
//
// /**
//  * 更新数据方法(带操作符的)
//  * @param tableName 数据表名
//  * @param conditions 更新条件 {_id: id, user_name: name}
//  * @param updateFields 更新的操作符 {$set: {id: 123}}
//  * @param callback 回调方法
//  */
// DB.prototype.updateData = function (tableName, conditions, updateFields, callback) {
//   if (!updateFields || !conditions) {
//     if (callback) callback({msg: 'Parameter error'})
//     return
//   }
//   let nodeModel = this.getConnection(tableName)
//   nodeModel.findOneAndUpdate(conditions, updateFields, {multi: true, upsert: true}, function (err, data) {
//     if (callback) callback(err, data)
//   })
// }
//
// /**
//  * 删除数据
//  * @param tableName 表名
//  * @param conditions 删除需要的条件 {_id: id}
//  * @param callback 回调方法
//  */
// DB.prototype.remove = function (tableName, conditions, callback) {
//   let nodeModel = this.getConnection(tableName)
//   nodeModel.remove(conditions, function (err, res) {
//     if (err) {
//       if (callback) callback(err)
//     } else {
//       if (callback) callback(null, res)
//     }
//   })
// }
//
// /**
//  * 查询数据
//  * @param tableName 表名
//  * @param conditions 查询条件
//  * @param fields 待返回字段
//  * @param callback 回调方法
//  */
// DB.prototype.find = function (tableName, conditions, fields, callback) {
//   let nodeModel = this.getConnection(tableName)
//   nodeModel.find(conditions, fields || null, {}, function (err, res) {
//     if (err) {
//       callback(err)
//     } else {
//       callback(null, res)
//     }
//   })
// }
//
// /**
//  * 查询单条数据
//  * @param tableName 表名
//  * @param conditions 查询条件
//  * @param callback 回调方法
//  */
// DB.prototype.findOne = function (tableName, conditions, callback) {
//   let nodeModel = this.getConnection(tableName)
//   nodeModel.findOne(conditions, function (err, res) {
//     if (err) {
//       callback(err)
//     } else {
//       callback(null, res)
//     }
//   })
// }
//
// /**
//  * 根据_id查询指定的数据
//  * @param tableName 表名
//  * @param _id 可以是字符串或 ObjectId 对象。
//  * @param callback 回调方法
//  */
// DB.prototype.findById = function (tableName, _id, callback) {
//   let nodeModel = this.getConnection(tableName)
//   nodeModel.findById(_id, function (err, res) {
//     if (err) {
//       callback(err)
//     } else {
//       callback(null, res)
//     }
//   })
// }
//
// /**
//  * 返回符合条件的文档数
//  * @param tableName 表名
//  * @param conditions 查询条件
//  * @param callback 回调方法
//  */
// DB.prototype.count = function (tableName, conditions, callback) {
//   let nodeModel = this.getConnection(tableName)
//   nodeModel.count(conditions, function (err, res) {
//     if (err) {
//       callback(err)
//     } else {
//       callback(null, res)
//     }
//   })
// }
//
// /**
//  * 查询符合条件的文档并返回根据键分组的结果
//  * @param table_name 表名
//  * @param field 待返回的键值
//  * @param conditions 查询条件
//  * @param callback 回调方法
//  */
// DB.prototype.distinct = function (tableName, field, conditions, callback) {
//   let nodeModel = this.getConnection(tableName)
//   nodeModel.distinct(field, conditions, function (err, res) {
//     if (err) {
//       callback(err)
//     } else {
//       callback(null, res)
//     }
//   })
// }
//
// /**
//  * 连写查询
//  * @param tableName 表名
//  * @param conditions 查询条件 {a:1, b:2}
//  * @param options 选项：{fields: "a b c", sort: {time: -1}, limit: 10}
//  * @param callback 回调方法
//  */
// DB.prototype.where = function (tableName, conditions, options, callback) {
//   let nodeModel = this.getConnection(tableName)
//   nodeModel.find(conditions)
//       .select(options.fields || '')
//       .sort(options.sort || {})
//       .limit(options.limit || {})
//       .exec(function (err, res) {
//         if (err) {
//           callback(err)
//         } else {
//           callback(null, res)
//         }
//       })
// }

module.exports = new DB()
