const co = require('co')
const mongoose = require('mongoose')

let conn = null

const { DBUSER, DBPASS, DBPATH } = process.env

const uri = 'mongodb://' + DBUSER + ':' + DBPASS + '@' + DBPATH

exports.handler = function(event, context, callback) {
  // Make sure to add this so you can re-use `conn` between function calls.
  // See https://www.mongodb.com/blog/post/serverless-development-with-nodejs-aws-lambda-mongodb-atlas
  context.callbackWaitsForEmptyEventLoop = false

  run()
    .then(res => {
      callback(null, res)
      console.log('done')
    })
    .catch(error => callback(error))
}

function run() {
  return co(function*() {
    // Because `conn` is in the global scope, Lambda may retain it between
    // function calls thanks to `callbackWaitsForEmptyEventLoop`.
    // This means your Lambda function doesn't have to go through the
    // potentially expensive process of connecting to MongoDB every time.
    if (conn == null) {
      conn = yield mongoose.createConnection(uri, {
        // Buffering means mongoose will queue up operations if it gets
        // disconnected from MongoDB and send them when it reconnects.
        // With serverless, better to fail fast if not connected.
        bufferCommands: false, // Disable mongoose buffering
        bufferMaxEntries: 0, // and MongoDB driver buffering
        useNewUrlParser: true, // current URL string parser is deprecated
      })
      conn.model(
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
    }

    const M = conn.model('Customer')

    const doc = yield M.findOne()
    console.log(doc)

    return doc
  })
}
