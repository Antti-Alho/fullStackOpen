const config = require('./utils/config')
const express = require('express')
require('express-async-errors')
const cors = require('cors')
const mongoose = require('mongoose')
const middlewares = require('./utils/middleware')
const logger = require('./utils/logger')
const blogRouter = require('./controllers/blogs')

const app = express()
app.use(cors())
app.use(express.json())

mongoose.set('useCreateIndex', true)
mongoose.set('useFindAndModify', false)

const url = config.MONGODB_URI
console.log('connecting to MONGODB_URI')

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then( () => logger.info('connected to MongoDB') )
  .catch((error) => {
    logger.error('error connecting to MongoDB:', error.message)
  })

app.use('/api/blogs', blogRouter)
app.use(middlewares.errorHandler)
app.use(middlewares.unknownEndpoint)

module.exports = app
