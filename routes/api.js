const config = require('../config')
const reports_folder = `${__dirname}/../${config.app.folder}/`
const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const ReportType = require('../controllers/reportTypeController')
const Report = require('../controllers/reportController')
const Base = require('../controllers/baseController')
const Reason = require('../controllers/reasonController')

router.get('/get/report-types', (req, res) => ReportType.getAll().then((reportTypes) => res.send(reportTypes)))
router.get('/get/reasons', (req, res) => Reason.getAll().then((reasons) => res.send(reasons)))
router.get('/get/bases', (req, res) => Base.getDistinctByBsId().then((bases) => res.send(bases)))
router.get('/get/markets', (req, res) => Base.getMarkets().then(markets => res.send(markets)))
router.get('/get/reports-by-user', (req, res) => Report.getAllByUser(req.user._id).then(reports => res.send(reports)))
router.get('/get/reports', (req, res) => Report.getAll().then(reports => res.send(reports)))
router.get('/get/report/:id', (req, res) => Report.getById(req.params.id).then(report => res.download(`${reports_folder}/${report.filename}`)))


module.exports = router