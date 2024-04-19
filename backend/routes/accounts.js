const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
// const jwt = require('jsonwebtoken')
// const { JWT_SECRET } = require('../config')

const { userSignupSchema, userLoginSchema } = require('../schemas/userSchemas')

// db user model
const { User, Account } = require('../db')
const { verifyToken } = require('../middleware')

router.get('/balance', verifyToken, async (req, res) => {
  console.log('Inside get balance')
  const userId = req.body.userId
  console.log('UserId:', req.body.userId)
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).send('Invalid ID format.')
  }

  const account = await Account.findOne({ userId: userId })
  if (account) {
    res.json({
      balance: account.balance,
    })
  } else {
    console.log('Error: Account does not exist')
    return res.status(400).send('Account does not exist')
  }
})

/// Account Transfer
router.post('/transfer', verifyToken, async (req, res) => {
  console.log('Inside account transfer')
  const body = req.body
  console.log('Body:', body)

  const session = await mongoose.startSession()
  session.startTransaction()
  const { amount, to } = req.body
  console.log('req.userId:', req.userId)
  const sourceAccount = await Account.findOne({ userId: req.userId }).session(session)
  console.log('Source Account:', sourceAccount)

  if (!sourceAccount || sourceAccount.balance < amount) {
    await session.abortTransaction()
    session.endSession()
    return res.status(400).send('Insufficient balance')
  }

  const targetAccount = await Account.findOne({ userId: to }).session(session)
  if (!targetAccount) {
    await session.abortTransaction()
    session.endSession()
    return res.status(400).send('Target account does not exist')
  }

  // deduct the balance from source account
  await Account.updateOne({ userId: sourceAccount.userId }, { $inc: { balance: -amount } }).session(session)
  // add the balance to target account
  await Account.updateOne({ userId: targetAccount.userId }, { $inc: { balance: amount } }).session(session)

  // commit transaction
  await session.commitTransaction()
  session.endSession()
  res.json({
    message: 'Amount transferred successfully',
  })
})

module.exports = router
