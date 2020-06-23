const bcrypt = require('bcrypt')
const Blog = require('../models/blog')
const User = require('../models/user')

const getAllUsers = async (req, res) => {
  let users = await User.find({}).populate('blogs')
  res.send(users)
}

const getUserByID = async (req, res) => {
  let user = await Blog.findById(req.params.id).populate('blogs')

  user
    ? res.send(user)
    : res.sendStatus(404)
}

const deleteUser = async (req, res) => {
  let userToBeRemoved = await Blog.findByIdAndDelete(req.params.id)

  userToBeRemoved
    ? res.sendStatus(204)
    : res.status(404).send({ error: 'not found' })
}

const newUser = async (req, res) => {
  if (req.body.password.length < 3) {
    return res.status(400).json({ error: 'password is too short' })
  }
  console.log(req.body)

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(req.body.password, saltRounds)
  const user = new User({
    userName: req.body.userName,
    name: req.body.name,
    passHash: passwordHash,
    blogs: []
  })
  console.log(user)
  const savedUser = await user.save()

  res.status(200).send(`${savedUser} added`)
}

const editUser = async (req, res) => {
  let modifiedBlog = await User.findByIdAndUpdate(req.params.id, req.body, { new: true })
  res.send(`${modifiedBlog} modified`)
}

module.exports = {
  getAllUsers,
  getUserByID,
  deleteUser,
  newUser,
  editUser
}