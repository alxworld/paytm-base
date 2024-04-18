const express = require('express')

const userRouter = require('./routes/users')
const accountRouter = require('./routes/accounts')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()

// enable cors
app.use(cors())
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.use(express.json())

// Routes
app.use('/api/v1/user', userRouter)
app.use('/api/v1/account', accountRouter)

// respond with "hello world" when a GET request is made to the homepage
app.get('/', (req, res) => {
  res.send('hello world')
})

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000')
})
