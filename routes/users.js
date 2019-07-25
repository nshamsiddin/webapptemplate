const express = require('express')
const passport = require('passport')
const router = express.Router()
const auth = require('../middleware/auth')

router.get('/login', (req, res) => {
    res.render('users/login')
})

router.post('/login', (req, res, next) => {
    const { username, password } = req.body
    let errors = []

    if (!username || !password) {
        errors.push('Please fill in all fields')
    }

    if (errors.length > 0) {
        errors.forEach((error) => { req.flash('danger', error) })
        res.render('users/login', { username })
    }

    else {
        passport.authenticate('local', {
            successRedirect: '/',
            successFlash: true,
            failureRedirect: '/users/login',
            failureFlash: true
        })(req, res, next)
    }
})

router.get('/logout', auth.isUser, (req, res) => {
    req.logout()
    req.flash('info', 'You Are logged out')
    res.redirect('/users/login')
})

module.exports = router