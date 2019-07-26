const logger = require('../modules/logger')
const Base = require('../models/base')

exports.getById = id => Base.findById({ id })
    .catch((err) => logger.error(err.message))

exports.getAll = () => Base.find()
    .catch((err) => logger.error(err.message))

exports.create = base => new Base(base)
    .save()
    .then(() => logger.info('Base station inserted'))
    .catch((err) => logger.error(err.message))

exports.delete = bs_id => Base.deleteOne({ bs_id })
    .then(() => logger.info('Base station removed'))
    .catch((err) => logger.error(err.message))