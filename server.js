'use strict'

// npm
const Koa = require('koa')
const nextjs = require('next')
const Router = require('koa-router')

// self
const addRoutes = require('./lib/routes')

const app = nextjs({ dev: process.env.NODE_ENV !== 'production' })

const log = async (ctx, next) => {
  const start = Date.now()
  await next()
  const ms = Date.now() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
}

const run = () => {
  const server = new Koa()
  const router = new Router()
  addRoutes(router, app)
  server.use(log)

  server.use(async (ctx, next) => {
    ctx.res.statusCode = 200
    await next()
  })
  server.use(router.routes())
  server.listen(3000, (err) => {
    if (err) { throw err }
    console.log('> Ready on http://localhost:3000')
  })
}

app.prepare().then(run)
