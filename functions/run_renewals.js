const mongoose = require('mongoose')

let conn = null

const { DBUSER, DBPASS } = process.env

const uri =
  'mongodb://' +
  DBUSER +
  ':' +
  DBPASS +
  '@ds151753.mlab.com:51753/renewalreminder'

exports.handler = function(event, context, callback) {
  //context.callbackWaitsForEmptyEventLoop = false

  conn = mongoose.createConnection(uri, {
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

  const M = conn.model('customers')

  const doc = M.find()
  const response = {
    statusCode: 200,
    body: JSON.stringify(doc),
  }
  console.log(uri)
  return response
}
