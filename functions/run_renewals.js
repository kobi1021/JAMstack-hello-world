'use strict'

const co = require('co')
const mongoose = require('mongoose')

let conn = null

const uri =
  'mongodb://' +
  DBUSER +
  ':' +
  DBPASS +
  '@ds151753.mlab.com:51753/renewalreminder'

const { DBUSER, DBPASS } = process.env

exports.handler = function(event, context, callback) {
  context.callbackWaitsForEmptyEventLoop = false

  run()
    .then(res => {
      callback(null, res)
    })
    .catch(error => callback(error))
}

function run() {
  return co(function*() {
    if (conn == null) {
      conn = yield mongoose.createConnection(uri, {
        bufferCommands: false,
        bufferMaxEntries: 0,
      })
      conn.model(
        'customers',
        new mongoose.Schema({
          firstName: String,
          lastName: String,
          phone: String,
          payDay: String,
          amount: String,
          notes: String,
          updated_At: { type: Date, default: Date.now },
        })
      )
    }

    const M = conn.model('customers')

    const doc = yield M.find()
    const response = {
      statusCode: 200,
      body: JSON.stringify(doc),
    }
    return response
  })
}
