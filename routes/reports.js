const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')

router.get('/', (req, res) => { res.render('index') })

router.get('/form', (req, res) => { res.render('reports/form') })

module.exports = router