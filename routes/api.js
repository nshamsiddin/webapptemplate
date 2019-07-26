const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const ReportType = require('../controllers/reportTypeController')
const Base = require('../controllers/baseController')
const Reason = require('../controllers/reasonController')

router.get('/get/report-types', (req, res) => ReportType.getAll().then((reportTypes) => res.send(reportTypes)))
router.get('/get/reasons', (req, res) => Reason.getAll().then((reasons) => res.send(reasons)))
router.get('/get/bases', (req, res) => Bases.getAll().then((bases) => res.send(bases)))
router.get('/get/markets', (req, res) => Base.getAll()
    .then((bases) => res.send([...new Set(bases
        .filter(base => base.market_key !== null && base.market_key !== undefined)
        .map((base) => base.market_key))
    ])))

module.exports = router