const config = require('../config')

const pino = require('pino')

const logger = pino(config.logger.options)

module.exports = logger