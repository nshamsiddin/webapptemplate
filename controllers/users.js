const logger = require('../modules/logger')
const User = require('../models/user')

exports.getById = id => User.findById({ id })

exports.get = username => User.findOne({ username })

exports.create = user => new User(user)
    .save()
    .then(() => logger.info('User created'))
    .catch((err) => logger.error(err.message))


exports.delete = _id => User.deleteOne({ _id })