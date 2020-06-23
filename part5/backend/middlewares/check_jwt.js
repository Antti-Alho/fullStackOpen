const jwt = require('jsonwebtoken')
const conf = require('../utils/config')

const checkJwt = async (req, res, next) => {
  const token = req.headers['authorization']
  let jwtPayload = jwt.verify(token, conf.SECRET)
  req.token = jwtPayload
  next()
}

module.exports = checkJwt