const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')

router.get('/', auth.isUser, (req, res) => {
    res.render('index')
})

module.exports = router