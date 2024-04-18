const { z } = require('zod')

const userSignupSchema = z.object({
  username: z.string().email(),
  firstName: z.string(),
  lastName: z.string(),
  password: z.string().min(8),
})

const userLoginSchema = z.object({
  username: z.string(),
  password: z.string().min(8),
})

module.exports = { userSignupSchema, userLoginSchema }
