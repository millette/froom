'use strict'

// npm
require('dotenv-safe').load()
const fetch = require('isomorphic-fetch')
const koaBody = require('koa-body')()
const pify = require('pify')
const AsyncLRU = require('async-lru')

// core
const qs = require('querystring')

const readAuth = Buffer
  .from([process.env.ReadKey, process.env.ReadPassword].join(':'))
  .toString('base64')

const writeAuth = Buffer
  .from([process.env.WriteKey, process.env.WritePassword].join(':'))
  .toString('base64')

module.exports = (router, app) => {
  const handle = app.getRequestHandler()

  const readHeaders = { authorization: 'Basic ' + readAuth }

  const lru = new AsyncLRU({
    max: 10,
    load: (key, cb) => {
      const obj = {}
      fetch(key, { headers: readHeaders })
        .then((res) => {
          obj.etag = res.headers.get('etag')
          obj.ok = res.ok
          obj.status = res.status
          obj.statusText = res.statusText
          return res.json()
        })
        .then((j) => {
          obj.body = j
          cb(null, obj)
        })
        .catch(cb)
    }
  })

  const plruget = pify(lru.get.bind(lru))

  router.get('/api/:more*', async (ctx) => {
    const u = [process.env.DBServer, process.env.DBName]
    if (ctx.params.more) { u.push(ctx.params.more) }
    if (Object.keys(ctx.query).length) { u.push('?' + qs.stringify(ctx.query)) }
    const j = await plruget(u.join('/'))
    if (j.etag) { ctx.etag = j.etag }
    ctx.body = j.body
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

  router.get('/aye/:id*', async (ctx) => {
    const obj = Object.assign({}, ctx.query, { id: ctx.params.id })
    await app.render(ctx.req, ctx.res, '/aye', obj)
    ctx.respond = false
  })

  router.get('*', async (ctx) => {
    await handle(ctx.req, ctx.res)
    ctx.respond = false
  })
}
