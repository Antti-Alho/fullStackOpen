const blogsRouter = require('express').Router()
const blogController = require('../controllers/blogs')
const checkJWT = require('../middlewares/check_jwt')
const checkPermission = require('../middlewares/check_permission')

blogsRouter.get(
  '/',
  blogController.getAllBlogs
)

blogsRouter.get(
  '/:id',
  blogController.getBlogByID
)

blogsRouter.post(
  '/',
  checkJWT,
  blogController.newBlog
)

blogsRouter.put(
  '/:id',
  blogController.editBlog
)

blogsRouter.delete(
  '/:id',
  checkJWT,
  checkPermission,
  blogController.deleteBlog
)

module.exports = blogsRouter