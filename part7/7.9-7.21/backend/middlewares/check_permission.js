const Blog = require('../models/blog')

const checkPermission = async (req, res, next) => {
  let blog = await Blog.findById(req.params.id)
  if (req.token.id !== blog.user.toString()) {
    return res.status(401).send({ error: 'user can only modify users own blogs' })
  }
  next()
}

module.exports = checkPermission