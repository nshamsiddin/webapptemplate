const mongoose = require('mongoose')
const config = require('../config')

const logger = require('./logger')

// mongoose.Promise = global.Promise

const url = config.mongodb.url
const options = config.mongodb.options

mongoose.connect(url, options)
    .then(() => { logger.info(`Connected to MongoDB at ${url}`) })
    .catch((err) => logger.error(err.message))

// MongoDB
exports.mongoose = mongoose

// This DB
exports.connect = mongoose.connection