const mongoose = require('mongoose')

mongoose.connect(
  'mongodb://' +
    DBUSER +
    ':' +
    DBPASS +
    '@ds151753.mlab.com:51753/renewalreminder'
)

var db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function() {
  // we're connected!
})

const Schema = mongoose.Schema

const customerSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  phone: String,
  payDay: String,
  policyStatus: String,
  notes: String,
  updated_At: { type: Date, default: Date.now },
})

const Customer = mongoose.model('Customer', customerSchema)

const { GREETING, DBUSER, DBPASS } = process.env

exports.handler = async (event, context) => {
  // get all the customers
  Customer.find({}, function(err, customers) {
    if (err) throw err
    return {
      statusCode: 200,
      body: customers,
    }
  })
}
