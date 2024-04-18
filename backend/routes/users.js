const express = require('express')
const router = express.Router()

router.post('/signup', (req, res) => {
  console.log('Inside user signup')
  res.send('User created')
})

router.post('/signin', (req, res) => {
  res.send('User logged in')
})

router.put('/changepasswd', (req, res) => {
  res.send('User Password updated')
})

module.exports = router
