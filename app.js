const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const blogsRouter = require('./controllers/blogs')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const config = require('./utils/config')

logger.info('Connecting to MongoDB...')

mongoose.connect(config.MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        logger.info('Connected to MongoDB')
    })
    .catch(error => {
        logger.error('Couldn\'t connect to MongoDB', error)
    })


app.use(cors())
app.use(express.json())
app.use(middleware.reqLogger)

app.use('/api/blogs', blogsRouter)

app.use(middleware.errorHandler)
app.use(middleware.unkownEndpoint)


module.exports = app