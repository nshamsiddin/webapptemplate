const logger = require('../modules/logger')
const ReportType = require('../models/reportType')

exports.getById = id => ReportType.findById(id)
    .catch((err) => logger.error(err.message))

exports.get = reportTypename => ReportType.findOne({ reportTypename })
    .catch((err) => logger.error(err.message))

exports.getAll = () => ReportType.find()
    .catch((err) => logger.error(err.message))

exports.create = reportType => new ReportType(reportType)
    .save()
    .then(() => logger.info('ReportType created'))
    .catch((err) => logger.error(err.message))

exports.delete = _id => ReportType.deleteOne({ _id })
    .catch((err) => logger.error(err.message))