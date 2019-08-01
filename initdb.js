const logger = require('./modules/logger')
const config = require('./config')
const Users = require('./controllers/userController')
const ReportTypes = require('./controllers/reportTypeController')
const Reasons = require('./controllers/reasonController')


init()

async function init() {
    const user = await Users.get(config.admin.username)
    if (!user) {
        await Users.create({ username: config.admin.username, group: config.admin.role })
        logger.info('Database initialization is done')
    }
}
