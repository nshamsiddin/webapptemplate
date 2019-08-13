const config = require('./config')

const logger = require('./modules/logger')
const mongodb = require('./modules/mongodb')

const express = require('express')
const session = require('express-session')
const path = require('path')

const flash = require('connect-flash')
const messages = require('express-messages')
const passport = require('passport')

// Init app
const app = express()

// Template engine
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

// Middlewares
// Path
app.use(express.static(path.join(__dirname, 'public')))

// Bodyparser
app.use(express.urlencoded({ extended: true }))

// Session
app.use(session({
    secret: config.app.secret,
    saveUninitialized: true,
    resave: true
}))

// Flash messages
app.use(flash())
app.use((req, res, next) => {
    res.locals.messages = messages(req, res)
    next()
})

// Passport
require('./modules/passport')(passport)

//Passport Middleware
app.use(passport.initialize())
app.use(passport.session())

app.get('*', (req, res, next) => {
    res.locals.user = req.user
    next()
})

app.locals.app_title = config.app.title

// Routes
app.use('/api', require('./routes/api'))
app.use('/', require('./routes/index'))
app.use('/users', require('./routes/users'))
app.use('/reports', require('./routes/reports'))
app.use('/reasons', require('./routes/reasons'))

app.all('*', (req, res) => { res.status(404).render('404') })

// Server
const port = config.app.port || 3000

app.listen(port, () => logger.info(`Server started on http://localhost:${port}`))
    .on('error', (err) => logger.error(err))