const LocalStrategy = require('passport-local').Strategy
const ActiveDirectory = require('activedirectory')
const mongoose = require('mongoose')
const config = require('../config')
const logger = require('./logger')

// const User = require('../models/user')
const User = require('../models/user')

let ad = new ActiveDirectory({
    url: config.ldap.url,
    baseDN: config.ldap.dn
})

module.exports = (passport) => {
    //Local Strategy
    passport.use(new LocalStrategy((username, password, done) => {
        let query = { username }
        if (username === config.admin.username && password === config.admin.password) {
            User.findOne(query, (err, user) => {
                if (err) {
                    logger.error(err.message)
                    return done(null, false, { message: 'Internal server error, please contact administrator' })
                }
                return done(null, user)
            })
        }
        else {
            User.findOne(query, (err, user) => {
                if (err) {
                    logger.error(err.message)
                    return done(null, false, { message: 'Internal server error, please contact administrator' })
                }
                if (!user)
                    return done(null, false, { message: 'No access to the system' })
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
                    if (auth) {
                        console.log(user)
                        return done(null, user)
                    }
                })
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