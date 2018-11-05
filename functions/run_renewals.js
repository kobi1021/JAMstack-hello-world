'use strict'
var mongoose = require('mongoose')
var co = require('co')

let conn = null

const { DBUSER, DBPASS, DBPATH } = process.env

const uri = 'mongodb://' + DBUSER + ':' + DBPASS + '@' + DBPATH

exports.handler = function(event, context, callback) {
  //context.callbackWaitForEmptyEventLoop = false

  let response

  return mongoose
    .connect(
      uri,
      {
        bufferCommands: false,
        bufferMaxEntries: 0,
        useNewUrlParser: true,
        useMongoClient: false,
      }
    )
    .then(ee => {
      // prepare your response
      response = { hello: 'world' }
    })
    .then(() => {
      mongoose.disconnect()
    })
    .then(() => {
      callback(null, response)
    })
    .catch(onerror)
  /*
  co(function*() {
    if (conn == null) {
      conn = yield mongoose.createConnection(uri, {
        bufferCommands: false,
        bufferMaxEntries: 0,
        useNewUrlParser: true,
        useMongoClient: false,
      })
    }
    console.log('Success!')
    callback(null, {
      statusCode: 200,
      body: 'Success!',
    })
  }).catch(onerror)
*/
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

function onerror(err) {
  // log any uncaught errors
  // co will not throw any errors you do not handle!!!
  // HANDLE ALL YOUR ERRORS!!!
  console.error(err.stack)
}
