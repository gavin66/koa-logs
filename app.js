const Koa = require('koa')
const KoaRouter = require('koa-router')
const KoaBodyParser = require('koa-bodyparser')
// const KoaJson = require('koa-json')
const KoaCors = require('koa2-cors')
const conf = require('./config')
const DB = require('./mongo')

const app = new Koa()
app.use(KoaBodyParser())
// app.use(KoaJson())
// 支持跨域
app.use(KoaCors())

const router = new KoaRouter()

router.post('/logs', async (ctx, next) => {
  let reqBody = ctx.request.body
  let table = 'table' in reqBody ? reqBody.table : 'logs_table'
  let data = {}
  try {
    data = JSON.parse('data' in reqBody ? reqBody.data : '{}')
  } catch (e) {
    console.error(e)
  }
  let result = await DB.save(table, data)

  if (result === false) {
    ctx.body = {'code': 1}
  } else {
    ctx.body = {'code': 0}
  }
})

app.use(router.routes())
app.use(router.allowedMethods())

app.listen(conf.app_port, () => {
  console.log('Koa is listening in ' + conf.app_port)
})
