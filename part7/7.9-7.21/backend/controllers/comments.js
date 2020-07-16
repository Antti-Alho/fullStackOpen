const Blog = require('../models/blog')
const Comment = require('../models/comment')

const getAllComments = async (req, res) => {
  let blogs = await Comment.find({})
    .populate('Blog')

  res.send(blogs)
}

const newComment = async (req, res) => {
  if (req.body === undefined) {
    return res.status(400).json({ error: 'content missing' })
  }
  const blog = await Blog.findById(req.params.id)
  const commentToBeSaved = new Comment( {
    comment: req.body.comment,
    blog: blog._id
  } )
  let savedComment = await commentToBeSaved.save()
  blog.comments = blog.comments.concat(savedComment._id)
  await blog.save()
  return res.sendStatus(204)
}


module.exports = {
  getAllComments,
  newComment
}