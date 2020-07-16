const routes = require('express').Router()
const blogs = require('./blogs')
const users = require('./users')
const login = require('./login')
const comments = require('./comments')

routes.use('/blogs', blogs)
routes.use('/users', users)
routes.use('/login', login)
routes.use('/comments', comments)

if (process.env.NODE_ENV === 'test') {
  const testingRouter = require('./testing')
  routes.use('/testing', testingRouter)
}

module.exports = routes