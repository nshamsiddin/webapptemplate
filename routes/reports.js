const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const hiveinterface = require('../modules/hiveinterface')

const ReportType = require('../controllers/reportTypeController')
const Base = require('../controllers/baseController')
const Reason = require('../controllers/reasonController')

const sqlbuilder = require('../modules/sqlbuilder')

router.get('/', (req, res) => { res.render('index') })

router.get('/request', async (req, res) => {
    const reports = await ReportType.getAll()
    res.render('reports/request', { reports })
})

router.post('/request', async (req, res) => {
    const { type, name } = req.body
    const report = await ReportType.getById(type)
    if (report) {
        const query = sqlbuilder.generate_query(report, req.body)
        hiveinterface.query(query, name)
            .then(response => {
                console.log(response)
            })
    }
})

module.exports = router