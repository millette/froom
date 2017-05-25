'use strict'

// npm
require('dotenv-safe').load()
const fetch = require('isomorphic-fetch')

const readAuth = Buffer
  .from([process.env.ReadKey, process.env.ReadPassword].join(':'))
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
