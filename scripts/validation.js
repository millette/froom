#!/usr/bin/env node

'use strict'

const fn = function (newDoc, oldDoc, userCtx, secObj) {
  if (userCtx.roles.indexOf('_admin') !== -1) { return }
  let ret
  if (newDoc && newDoc._deleted) {
    ret = { forbidden: 'Delete not permitted.' }
    throw ret
  }
  if (oldDoc) {
    ret = { forbidden: 'Edit not permitted.' }
    throw ret
  }
}

const _id = '_design/auth'

console.log(JSON.stringify({ _id, validate_doc_update: fn.toString() }, null, ' '))

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
