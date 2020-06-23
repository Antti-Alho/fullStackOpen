const routes = require('express').Router()
const blogs = require('./blogs')
const users = require('./users')
const login = require('./login')

routes.use('/blogs', blogs)
routes.use('/users', users)
routes.use('/login', login)

module.exports = routes