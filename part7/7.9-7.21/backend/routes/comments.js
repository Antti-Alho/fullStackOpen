const blogsRouter = require('express').Router()
const blogController = require('../controllers/comments')

blogsRouter.post('/:id', blogController.newComment)

module.exports = blogsRouter