#!/usr/bin/env node

'use strict'

// npm
require('dotenv-safe')
  .load({ path: '../.env', sample: '../.env.example' })
const fetch = require('isomorphic-fetch')

const adminAuth = Buffer
  .from([process.env.AdminKey, process.env.AdminPassword].join(':'))
  .toString('base64')

const fn = function (newDoc, oldDoc, userCtx, secObj) {
  if (userCtx.roles.indexOf('_admin') !== -1) { return }
  var ret
  if (newDoc && newDoc._deleted) {
    ret = { forbidden: 'Delete not permitted.' }
    throw ret
  }
  if (oldDoc) {
    ret = { forbidden: 'Edit not permitted.' }
    throw ret
  }
}

const doIt = () => {
  const body = JSON.stringify({
    _id: '_design/auth',
    validate_doc_update: fn.toString()
  })
  const headers = {
    authorization: 'Basic ' + adminAuth,
    'content-type': 'application/json',
    accept: 'application/json'
  }

  const opts = { headers, method: 'POST', body }
  const u = [process.env.DBServer, process.env.DBName].join('/')
  fetch(u, opts)
    .then((res) => res.json())
    .then(console.log)
}

doIt()

/*
Example arguments
{
  "userCtx": {
    "db": "millette/dwk",
    "name": "hromeleariessilesredyinu",
    "roles": ["_writer"]
  },
  "secObj": {
    "cloudant": {
      "millette": ["_writer", "_admin",
        "_replicator", "_reader"
      ],
      "edenteethandedstesterpoo": [
        "_reader"
      ],
      "nobody": [],
      "hromeleariessilesredyinu": [
        "_writer"
      ]
    }
  }
}
*/
