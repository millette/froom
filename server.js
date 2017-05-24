'use strict'

require('dotenv-safe').load()
const Koa = require('koa')
const nextjs = require('next')
const Router = require('koa-router')
const fetch = require('isomorphic-fetch')

const dev = process.env.NODE_ENV !== 'production'
const app = nextjs({ dev })
const handle = app.getRequestHandler()

const readAuth = 'Basic ' + Buffer.from([process.env.ReadKey, process.env.ReadPassword].join(':')).toString('base64')

app.prepare()
.then(() => {
  const server = new Koa()
  const router = new Router()

  router.get('/api/:more*', async ctx => {
    const headers = { authorization: readAuth }
    const u = ['https://millette.cloudant.com', 'dwk']
    if (ctx.params.more) { u.push(ctx.params.more) }
    const res = await fetch(u.join('/'), { headers })
    ctx.body = await res.json()
  })

  router.get('/a', async ctx => {
    await app.render(ctx.req, ctx.res, '/b', ctx.query)
    ctx.respond = false
  })

  router.get('/b', async ctx => {
    await app.render(ctx.req, ctx.res, '/a', ctx.query)
    ctx.respond = false
  })

  router.get('*', async ctx => {
    await handle(ctx.req, ctx.res)
    ctx.respond = false
  })

  server.use(async (ctx, next) => {
    const start = Date.now()
    await next()
    const ms = Date.now() - start
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
  })

  server.use(async (ctx, next) => {
    ctx.res.statusCode = 200
    await next()
  })

  server.use(router.routes())
  server.listen(3000, (err) => {
    if (err) throw err
    console.log('> Ready on http://localhost:3000')
  })
})
