const Blog = require('../models/blog')
const User = require('../models/user')

const getAllBlogs = async (req, res) => {
  let blogs = await Blog.find({})
    .populate('user', { userName: 1, name: 1, id: 1 } )

  res.send(blogs)
}

const getBlogByID = async (req, res) => {
  let blog = await Blog
    .findById(req.params.id)
    .populate('user', { userName: 1, name: 1, id: 1 } )

  blog
    ? res.status(200).send(blog)
    : res.sendStatus(404)
}

const deleteBlog = async (req, res) => {
  let removedBlog = await Blog.findByIdAndDelete(req.params.id)

  removedBlog
    ? res.sendStatus(204)
    : res.status(404).send({ error: 'not found' })
}

const newBlog = async (req, res) => {
  if (req.body === undefined) {
    return res.status(400).json({ error: 'content missing' })
  }

  const user = await User.findById(req.token.id)
  const blogToBeSaved = new Blog( {
    title: req.body.title,
    author: req.body.author,
    url: req.body.url,
    likes: req.body.likes === undefined ? 0 : req.body.likes,
    user: user._id
  } )
  let savedBlog = await blogToBeSaved.save()

  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  return res.status(200).send(`${savedBlog} added`)
}

const editBlog = async (req, res) => {
  if (req.body === undefined) {
    return res.status(400).json({ error: 'content missing' })
  }

  let modifiedBlog = await Blog
    .findByIdAndUpdate(req.params.id, req.body, { new: true })
    .populate('user', { userName: 1, name: 1, id: 1 } )

  return res.send(`${modifiedBlog} modified`)
}

module.exports = {
  getAllBlogs,
  getBlogByID,
  deleteBlog,
  newBlog,
  editBlog
}