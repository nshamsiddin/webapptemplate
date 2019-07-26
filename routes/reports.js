const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const ReportType = require('../controllers/reportTypeController')
const Base = require('../controllers/baseController')
const Reason = require('../controllers/reasonController')

router.get('/', (req, res) => { res.render('index') })

router.get('/request', async (req, res) => {
    const reports = await ReportType.getAll()
    const reasons = await Reason.getAll()
    const bases = await Base.getAll()
    const markets = [...new Set(bases.map((base) => base.market_key))];
    res.render('reports/request', { reports, reasons, bases, markets })
})

router.post('/request', async (req, res) => {
    const { type, date, date2, bases, markets, reasons } = req.body
    const report = await ReportType.getById(type)
    const query = 
})

module.exports = router