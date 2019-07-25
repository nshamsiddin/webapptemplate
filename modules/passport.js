const LocalStrategy = require('passport-local').Strategy
const ActiveDirectory = require('activedirectory')
const mongoose = require('mongoose')
const config = require('../config')
const logger = require('./logger')

// const User = require('../models/user')
const User = require('../models/user')
const Users = require('../controllers/users')

let ad = new ActiveDirectory({
    url: config.ldap.url,
    baseDN: config.ldap.dn
})


module.exports = (passport) => {
    //Local Strategy
    passport.use(new LocalStrategy((username, password, done) => {
        let query = { username }
        if (username === config.admin.username && password === config.admin.password) {
            Users.get(username)
                .then((user) => done(null, user, { message: 'You are now logged in as an administrator' }))
                .catch((err) => done(null, false, { message: 'Internal server error, please contact administrator' }))
        }
        else {
            Users.get(username)
                .then((user) => {
                    if (!user)
                        return done(null, false, { message: 'No access to the system' })
                    else {
                        ad.authenticate(`${username}@${config.ldap.domain}`, password, (err, auth) => {
                            if (err) {
                                let message
                                if (err.code === 49)
                                    message = 'Invalid username/password combination'
                                else {
                                    message = 'Internal server error, please contact administrator'
                                    logger.error(err.message)
                                }
                                return done(null, false, { message })
                            }
                            if (auth)
                                return done(null, user, { message: 'Logged in' })
                        })
                    }
                })
        }
    }))
    passport.serializeUser((user, done) => {
        done(null, user.id)
    })
    passport.deserializeUser((id, done) => {
        User.findById(id, function (err, user) {
            done(err, user)
        })
    })
}