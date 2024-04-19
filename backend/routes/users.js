const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../config')

const { userSignupSchema, userLoginSchema } = require('../schemas/userSchemas')

// db user model
const { User, Account } = require('../db')
const { verifyToken } = require('../middleware')

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
  // create user
  const createdUser = await User.create(data)
  // create account
  const account = await Account.create({ userId: createdUser._id, balance: Math.random() * 10000 })
  // create auth token for this user
  const token = jwt.sign({ userId: createdUser._id }, JWT_SECRET)
  res.json({
    message: 'User created successfully',
    token: token,
    account: account,
  })
})

router.post('/signin', (req, res) => {
  res.send('User logged in')
})

router.put('/update', verifyToken, async (req, res) => {
  console.log('Inside user update')
  const body = req.body
  console.log('request body:', body)
  const { success, data, error } = userSignupSchema.safeParse(body)
  if (!success) {
    console.log('Error:', error)
    return res.status(400).send('Invalid request')
  } else {
    console.log('Data:', data)
  }

  const updatedUser = await User.updateOne({ username: data.username }, data)
  res.json({
    message: 'User details updated successfully',
  })
})

router.get('/bulk', verifyToken, async (req, res) => {
  console.log('Inside user bulk')
  const filter = req.query.filter || ''
  console.log('Query Filter: ', filter)

  const listUsers = await User.find({
    $or: [{ firstName: { $regex: filter } }, { lastName: { $regex: filter } }],
  })
  res.json({
    users: listUsers.map(user => ({
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      _id: user._id,
    })),
  })
})

module.exports = router
