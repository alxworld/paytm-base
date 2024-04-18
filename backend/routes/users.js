const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../config')

const { userSignupSchema, userLoginSchema } = require('../schemas/userSchemas')

// db user model
const User = require('../db')

router.post('/signup', async (req, res) => {
  console.log('Inside user signup')
  const body = req.body
  console.log('Body:', body)

  const { success, data, error } = userSignupSchema.safeParse(body)
  if (!success) {
    console.log('Error:', error)
    return res.status(400).send('Invalid request')
  } else {
    console.log('Data:', data)
  }

  // save to mongodb
  const user = await User.findOne({ username: data.username })
  if (user) {
    return res.status(400).send('User already exists')
  }
  const createdUser = await User.create(data)
  const token = jwt.sign({ userId: createdUser._id }, JWT_SECRET)
  //const user = new User(data)
  res.json({
    message: 'User created successfully',
    token: token,
  })
})

router.post('/signin', (req, res) => {
  res.send('User logged in')
})

router.put('/changepasswd', (req, res) => {
  res.send('User Password updated')
})

module.exports = router
