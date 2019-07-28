const logger = require('../modules/logger')
const Reason = require('../models/reason')

exports.getById = id => Reason.findById(id)
    .catch((err) => logger.error(err.message))

exports.getByCode = code => Reason.findById({ disconnect_reason_code: code })
    .catch((err) => logger.error(err.message))

exports.getAll = () => Reason.find()
    .catch((err) => logger.error(err.message))

exports.create = reason => new Reason(reason)
    .save()
    .then(() => logger.info('Reason inserted'))
    .catch((err) => logger.error(err.message))

exports.delete = bs_id => Reason.deleteOne({ bs_id })
    .then(() => logger.info('Reason removed'))
    .catch((err) => logger.error(err.message))