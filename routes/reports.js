const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const ReportType = require('../controllers/reportTypeController')
const Base = require('../controllers/baseController')
const Reason = require('../controllers/reasonController')

router.get('/', (req, res) => { res.render('index') })

router.get('/request', async (req, res) => {
    const reports = await ReportType.getAll()
    // const reasons = await Reason.getAll()
    // const bases = await Base.getAll()
    // const markets = [...new Set(bases.map((base) => base.market_key))];
    // res.render('reports/request', { reports, reasons, bases, markets })
    res.render('reports/request', {reports})
})

router.post('/request', async (req, res) => {
    const { type, date, date2, bases, markets, reasons } = req.body
    console.log(req.body)
    const report = await ReportType.getById(type)
    // const query = generate_query(report.query)
})

function generate_query(query) {
    const pdate = `AND a.pdate in (${build_partitions_list(from, to)})`
    const reasons = `AND a.pdate in (${build_partitions_list(from, to)})`
    const markets = `AND a.pdate in (${build_partitions_list(from, to)})`
    const bases = `AND a.pdate in (${build_partitions_list(from, to)})`
    
}

function build_partitions(date_from, date_to) {
    let result = ""
    let date1 = moment(date_from, 'YYYY-MM-DD')
    let date2 = moment(date_to, 'YYYY-MM-DD');
    let tmp
    for (tmp = date1; tmp < date2; tmp.add(1, 'days')) {
        result += `'${tmp.format('YYYYMMDD')}',`
    }
    result += `'${tmp.format('YYYYMMDD')}'`
    // console.log('RESULT is '  + result)
    return result
}


module.exports = router