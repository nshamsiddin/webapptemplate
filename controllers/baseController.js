const logger = require('../modules/logger')
const Base = require('../models/base')

exports.getById = id => Base.findById(id)
    .catch((err) => logger.error(err.message))

exports.getDistinctByBsId = () => Base
    .aggregate([{ "$group": { _id: { bs_id: "$bs_id", region: "$region" } } }])
    .then(bases => bases
        .map(p => p._id)
        .sort((a, b) => a.bs_id - b.bs_id)
        .filter(base => base.bs_id !== null && base.bs_id !== undefined))
    .catch((err) => logger.error(err.message))

exports.getMarkets = () => Base
    .aggregate([{ "$group": { _id: { market_key: "$market_key", region: "$region" } } }])
    .then(bases => bases
        .map(p => p._id)
        .sort((a, b) => ('' + a.market_key).localeCompare(b.market_key))
        .filter(base => base.market_key !== null && base.market_key !== undefined))
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