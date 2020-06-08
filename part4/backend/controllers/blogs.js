const Blog = require('../models/blog')
const blogsRouter = require('express').Router()

blogsRouter.get('/', async (req, res, next) => {
  let blogs = await Blog.find({})
    .catch(error => next(error))
  res.send(blogs)
})

blogsRouter.get('/:id', async (req, res, next) => {
  let blog = await Blog.findById(req.params.id)
    .catch(error => next(error))

  if (blog) {
    res.send(blog)
  } else {
    res.send(404)
  }
})

blogsRouter.delete('/:id', async (req, res, next) => {
  let blogToBeRemoved = await Blog.findByIdAndDelete(req.params.id)
    .catch(error => next(error))

  if (blogToBeRemoved) {
    res.send('blog removed')
  } else {
    res.status(404).send({ error: 'not found' })
  }
})

blogsRouter.post('/', (req, res, next) => {
  if (req.body === undefined) {
    return res.status(400).json({ error: 'content missing' })
  }

  let blog = req.body
  const blogToBeSaved = new Blog({ name: blog.name, number: blog.number })
  blogToBeSaved.save()
    .then( savedBlog => res.send(`${savedBlog} added`) )
    .catch( error => next(error) )
})

blogsRouter.put('/:id', (req, res, next) => {
  if (req.body === undefined) {
    return res.status(400).json({ error: 'content missing' })
  }

  let blog = req.body
  Blog.findByIdAndUpdate(req.params.id, blog, { new: true })
    .then(modifiedBlog => res.send(`${modifiedBlog} modified`))
    .catch(error => next(error))
})

module.exports = blogsRouter