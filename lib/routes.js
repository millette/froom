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

  const load = (key, cb) => {
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

  const lru = new AsyncLRU({ max: 10, load, maxAge: 10 * 60 * 1000 })
  const lruDocs = new AsyncLRU({ max: 100, load, maxAge: 10 * 60 * 1000 })
  const plruget = pify(lru.get.bind(lru))
  const plrudocsget = pify(lruDocs.get.bind(lruDocs))

  router.get('/api/:more*', async (ctx) => {
    const u = [process.env.DBServer, process.env.DBName]
    let yup = plruget
    if (ctx.params.more) {
      u.push(ctx.params.more)
      if (ctx.params.more !== '_all_docs') { yup = plrudocsget }
    }
    if (Object.keys(ctx.query).length) { u.push('?' + qs.stringify(ctx.query)) }
    const ul = u.join('/')
    const j = await yup(ul)
    if (j.etag) { ctx.etag = j.etag }
    ctx.body = j.body

    if (j.body && j.body.rows && j.body.rows.length && j.body.rows[0].doc) {
      j.body.rows.forEach((row) => lruDocs.set(
        [process.env.DBServer, process.env.DBName, row.id].join('/'),
        { body: row.doc }))
    }
  })

  router.post('/api', koaBody, async (ctx) => {
    const headers = {
      accept: 'application/json',
      'content-type': 'application/json',
      authorization: 'Basic ' + writeAuth
    }

    const now = Date.now()
    const n2 = (now * 1000) + Math.floor(Math.random() * 1000)
    const _id = ['comment', n2].join(':')

    const doc = Object.assign({ _id, createdAt: new Date(now).toISOString() }, ctx.request.body)
    const opts = {
      headers,
      method: 'POST',
      body: JSON.stringify(doc)
    }
    const res = await fetch([process.env.DBServer, process.env.DBName].join('/'), opts)
    ctx.assert(res.ok, res.status, res.statusText)
    ctx.body = await res.json()
    lru.clear()
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
