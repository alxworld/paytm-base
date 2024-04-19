const { JWT_SECRET } = require('./config')
const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).send('Access Denied')
  }

  // picking the token from the header - 2nd word
  const token = authHeader.split(' ')[1]
  try {
    const verified = jwt.verify(token, JWT_SECRET)
    req.userId = verified.userId
    console.log('Verified:', verified)
    next()
  } catch (err) {
    console.log('Failed on Verified:', verified)
    res.status(400).send('Invalid Token')
  }
}

module.exports = { verifyToken }
