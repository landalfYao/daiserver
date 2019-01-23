const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const jwt = require('jsonwebtoken')
const jwtKoa = require('koa-jwt')
const cors = require('koa2-cors');
const config = require('./pub/config/config.js');
const session = require('koa-session');
const RedisStore = require('koa2-session-redis');

const index = require('./routes/index')
const user = require('./routes/user')
const secret = require('./routes/secret')
const roles = require('./routes/roles')
const wxuser = require('./routes/wxuser')
const file = require('./routes/file')
const order = require('./routes/order')
const agents = require('./routes/agents')

const koaBody = require('koa-body');
app.use(koaBody({
  multipart: true,
  formidable: {
    maxFileSize: 20000 * 1024 * 1024 // 设置上传文件大小最大限制，默认200M
  }
}));
// const secretKey = 'adfbrw32rfr23'
// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes: ['json', 'form', 'text']
}))
// app.use(jwtKoa({secretKey}).unless({
//         path: ['/^\/api\/user\/login/,/^\/api\/user\/register/,/^\/apidoc\/index.html#api-User-Login/'] 
//     }))

app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'ejs'
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

app.keys = ['Porschev'];
const redis_conf = {
  key: 'Porschev',
  maxAge: config.REDIS.maxAge,
  overwrite: true,
  httpOnly: true,
  rolling: false,
  sign: true,
  store: new RedisStore({
    host: config.REDIS.host,
    port: config.REDIS.port,
    password: config.REDIS.password
  })
};


app.use(cors({
  exposeHeaders: ['WWW-Authenticate', 'Server-Authorization', 'Date'],
  maxAge: 100,
  credentials: true,
  allowMethods: ['GET', 'POST', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization', 'Accept', 'X-Custom-Header', 'anonymous', 'token', 'uid'],
}));

app.use(session(redis_conf, app));

// routes
app.use(index.routes(), index.allowedMethods())
app.use(user.routes(), user.allowedMethods())
app.use(secret.routes(), secret.allowedMethods())
app.use(roles.routes(), roles.allowedMethods())
app.use(wxuser.routes(), wxuser.allowedMethods())
app.use(file.routes(), file.allowedMethods())
app.use(order.routes(), order.allowedMethods())
app.use(agents.routes(), agents.allowedMethods())


// error-handling 
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});




module.exports = app