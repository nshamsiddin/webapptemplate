const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const ReportType = require('../controllers/reportTypeController')
const Base = require('../controllers/baseController')
const Reason = require('../controllers/reasonController')

router.get('/get/report-types', (req, res) => ReportType.getAll().then((reportTypes) => res.send(reportTypes)))
router.get('/get/reasons', (req, res) => Reason.getAll().then((reasons) => res.send(reasons)))
router.get('/get/bases', (req, res) => Base.getDistinctByBsId().then((bases) => res.send(bases)))
router.get('/get/markets', (req, res) => Base.getMarkets().then(markets => res.send(markets)))

function uniqifyBy(array, param) {
    const result = []
    array.forEach(p => {
        if (!exists(result, p, param))
            result.push(p)
    })
    return result
}

function exists(array, element, param) {
    for (let p of array)
        if (p[param] == element[param])
            return true
    return false
}


module.exports = router