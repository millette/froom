#!/usr/bin/env node

'use strict'

const fn = function (newDoc, oldDoc, userCtx, secObj) {
  if (userCtx.roles.indexOf('_admin') !== -1) { return }
  if (newDoc && newDoc._deleted) { throw({ forbidden: 'Delete not permitted.' }) }
  if (oldDoc) { throw({ forbidden: 'Edit not permitted.' }) }
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
