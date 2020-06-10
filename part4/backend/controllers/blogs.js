const Blog = require('../models/blog')
const blogsRouter = require('express').Router()

blogsRouter.get('/', async (req, res) => {
  let blogs = await Blog.find({})
  res.send(blogs)
})

blogsRouter.get('/:id', async (req, res) => {
  let blog = await Blog.findById(req.params.id)

  if (blog) {
    res.send(blog)
  } else {
    res.sendStatus(404)
  }
})

blogsRouter.delete('/:id', async (req, res) => {
  let blogToBeRemoved = await Blog.findByIdAndDelete(req.params.id)

  if (blogToBeRemoved) {
    res.sendStatus(204)
  } else {
    res.status(404).send({ error: 'not found' })
  }
})

blogsRouter.post('/', async (req, res) => {
  if (req.body === undefined) {
    return res.status(400).json({ error: 'content missing' })
  }

  const blogToBeSaved = new Blog( req.body )
  let savedBlog = await blogToBeSaved.save()
  res.send(`${savedBlog} added`)
})

blogsRouter.put('/:id', async (req, res) => {
  if (req.body === undefined) {
    return res.status(400).json({ error: 'content missing' })
  }

  let blog = req.body
  let modifiedBlog = await Blog.findByIdAndUpdate(req.params.id, blog, { new: true })
  res.send(`${modifiedBlog} modified`)
})

module.exports = blogsRouter