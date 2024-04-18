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

const User = mongoose.model('User', userSchema)

module.exports = User
