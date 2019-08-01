const logger = require('../modules/logger')
const Report = require('../models/report')
const config = require('../config')

exports.getById = id => Report.findById(id)
    .catch((err) => logger.error(err.message))

exports.getAllByUser = (userId) => Report.find({ author: userId })
    .catch((err) => logger.error(err.message))

exports.getAll = () => Report.find()
    .catch((err) => logger.error(err.message))

exports.create = report => new Report(report)
    .save()
    .catch((err) => logger.error(err.message))

exports.save = report => report
    .save()
    .catch((err) => logger.error(err.message))

exports.setStatus = (report, status, comment, size = null) => {
    Report.findOneAndUpdate({ _id: report._id },
        { $set: { status, comment, size } })
        .catch((err) => logger.error(err.message))
}

exports.delete = _id => Report.deleteOne({ _id })
    .catch((err) => logger.error(err.message))