var _ = require('lodash')

const dummy = () => 1

const totalLikes = ( blogs ) => {
  let likes = 0
  blogs.forEach(blog => likes += blog.likes)
  return likes
}

const favoriteBlog = (blogs) => {
  let favourite
  blogs.forEach(blog => {
    if ( !favourite || blog.likes > favourite.likes) {
      favourite = blog
    }
  })
  return favourite
}

const mostBlogs = (blogs) => {
  const blogAmounts = _.countBy(blogs, 'author')
  let maxAmount = _.max(_.values(blogAmounts))
  let maxAuthor = _.invert(blogAmounts)[maxAmount]
  return { author: maxAuthor, blogs: maxAmount }
}

const mostLikes = (blogs) => {
  let authors = []
  blogs.forEach(blog => {
    authors.some(author => author.author === blog.author)
      ? _.find(authors, ['author', blog.author]).likes += blog.likes
      : authors.push({ author: blog.author, likes: blog.likes })
  })
  return _.maxBy(authors, 'likes')
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}