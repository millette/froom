'use strict'

// npm
require('dotenv-safe').load()
const fetch = require('isomorphic-fetch')
const koaBody = require('koa-body')()

const readAuth = Buffer
  .from([process.env.ReadKey, process.env.ReadPassword].join(':'))
  .toString('base64')

const writeAuth = Buffer
  .from([process.env.WriteKey, process.env.WritePassword].join(':'))
  .toString('base64')

module.exports = (router, app) => {
  const handle = app.getRequestHandler()

  router.get('/api/:more*', async (ctx) => {
    const headers = { authorization: 'Basic ' + readAuth }
    const u = [process.env.DBServer, process.env.DBName]
    if (ctx.params.more) { u.push(ctx.params.more) }
    const res = await fetch(u.join('/'), { headers })
    ctx.assert(res.ok, res.status, res.statusText)
    ctx.body = await res.json()
  })

  router.post('/api', koaBody, async (ctx) => {
    const headers = {
      accept: 'application/json',
      'content-type': 'application/json',
      authorization: 'Basic ' + writeAuth
    }
    const opts = {
      headers,
      method: 'POST',
      body: JSON.stringify(ctx.request.body)
    }
    const res = await fetch([process.env.DBServer, process.env.DBName].join('/'), opts)
    ctx.assert(res.ok, res.status, res.statusText)
    ctx.body = await res.json()
  })

  router.get('/db/:more+', async (ctx) => {
    const obj = Object.assign({}, ctx.query, { what: ctx.params.more })
    await app.render(ctx.req, ctx.res, '/db', obj)
    ctx.respond = false
  })

  router.get('*', async (ctx) => {
    await handle(ctx.req, ctx.res)
    ctx.respond = false
  })
}
