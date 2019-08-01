const express = require('express')
const mongoose = require('mongoose')

const router = express.Router()

const auth = require('../middleware/auth')
const hiveinterface = require('../modules/hiveinterface')

const Base = require('../controllers/baseController')
const Reason = require('../controllers/reasonController')
const Report = require('../controllers/reportController')
const ReportType = require('../controllers/reportTypeController')

const sqlbuilder = require('../modules/sqlbuilder')

router.get('/', async (req, res) => {
    // const reports = await Report.getAllByUser(req.user._id)
    const reports = await Report.getAll()
    res.render('reports/reports', { reports })

})

router.get('/request', async (req, res) => {
    const reportsTypes = await ReportType.getAll()
    res.render('reports/request', { reports: reportsTypes })
})

router.post('/request', async (req, res) => {
    const { type,  } = req.body
    const name = `${req.body.name}.xlsx`
    const reportType = await ReportType.getById(type)
    if (reportType) {
        const query = sqlbuilder.generate_query(reportType, req.body)
        let report = await Report.create({
            query,
            size: 0,
            filename: name,
            report: mongoose.Types.ObjectId(reportType._id),
            author: mongoose.Types.ObjectId(req.user._id)
        })
        hiveinterface.query(query, name)
            .then(response => {
                if (response && response.status === 200)
                    Report.setStatus(report, 1, 'Success', response.data.comment)
                else
                    Report.setStatus(report, -1, response.statusText)
            })
            .catch((err) => Report.setStatus(report, -1, err.message))
    }
    else {
        req.flash('danger', 'No such report found!')
        res.render('reports/request', { reports: reportsTypes })
        return
    }
    req.flash('info', 'Your report is being processed, please wait')
    res.redirect('/reports')
})

module.exports = router