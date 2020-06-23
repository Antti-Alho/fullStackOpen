const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../models/user')

const login = async (req, res) => {
  const body = req.body

  const user = await User.findOne({ userName: body.userName })
  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(body.password, user.passHash)

  if (!(user && passwordCorrect)) {
    return res.status(401).json({
      error: 'invalid username or password'
    })
  }

  const userForToken = {
    username: user.userName,
    id: user._id,
  }
  const token = jwt.sign(userForToken, process.env.SECRET)
  res.status(200).send({ token, username: user.userName, name: user.name })
}

module.exports = { login }