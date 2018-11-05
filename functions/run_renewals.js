'use strict'
var mongoose = require('mongoose')
var co = require('co')

let conn = null

const { DBUSER, DBPASS } = process.env

const uri =
  'mongodb://' +
  DBUSER +
  ':' +
  DBPASS +
  '@ds151753.mlab.com:51753/renewalreminder'

exports.handler = function(event, context, callback) {
  context.callbackWaitForEmptyEventLoop = false
  /*
  conn = mongoose
    .createConnection(uri, {
      bufferCommands: false,
      bufferMaxEntries: 0,
      useNewUrlParser: true,
    })
    .then(() => {
      console.log('MongoDB: Connection successful!')
      callback(null, {
        statusCode: 200,
        body: 'Success!',
      })
    })
    .catch(error =>
      callback(null, {
        statusCode: 400,
        body: 'MongoDB: Connection failed!',
      })
    )*/
  console.log('Success!')
  callback(null, {
    statusCode: 200,
    body: 'Success!',
  })
  /*
    const M = conn.model(
      'Customer',
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

    const doc = M.find()
    //console.log(doc)
    const response = {
      statusCode: 200,
      body: JSON.stringify(doc),
    }
    //console.log(uri)
    return response
    */
}
