const express = require('express')
const mongoose = require('mongoose')

const router = express.Router()

const auth = require('../middleware/auth')
const hiveinterface = require('../modules/hiveinterface')

const Reason = require('../controllers/reasonController')

const sqlbuilder = require('../modules/sqlbuilder')

router.get('/', auth.isUser, async (req, res) => {
    const reasons = await Reason.getAll()
    res.render('reasons/reasons', { reasons })
})

router.post('/change', (req, res) => {
    const {id, check} = req.body
    Reason.change(id, check)
    // console.log(req.body)
})

module.exports = router