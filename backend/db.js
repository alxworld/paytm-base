const mongoose = require('mongoose')

const db = mongoose
  .connect('mongodb://127.0.0.1:27017/paytm')
  .then(() => {
    console.log('Connected to the Database successfully')
  })
  .catch(err => {
    console.log('Error connecting to the Database')
  })

const userSchema = new mongoose.Schema({
  firstName: String, // String is shorthand for {type: String}
  lastName: String,
  username: String,
  password: String,
})

const accountSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  balance: {
    type: Number,
    default: 0,
    required: true,
  },
})

const User = mongoose.model('User', userSchema)
const Account = mongoose.model('Account', accountSchema)

module.exports = { User, Account }
