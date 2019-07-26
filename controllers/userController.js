const logger = require('../modules/logger')
const User = require('../models/user')

exports.getById = id => User.findById({ id })
    .catch((err) => logger.error(err.message))

exports.get = username => User.findOne({ username })
    .catch((err) => logger.error(err.message))

exports.create = user => new User(user)
    .save()
    .then(() => logger.info('User created'))
    .catch((err) => logger.error(err.message))

exports.delete = _id => User.deleteOne({ _id })
    .catch((err) => logger.error(err.message))