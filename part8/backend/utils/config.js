require('dotenv').config()

let MONGODB_URI = process.env.MONGODB_URI
let SECRET = process.env.SECRET
let JWT_SECRET = process.env.JWT_SECRET

if (process.env.NODE_ENV === 'test') {
  MONGODB_URI = process.env.TEST_MONGODB_URI
}

module.exports = {
  MONGODB_URI,
  SECRET,
  JWT_SECRET
}