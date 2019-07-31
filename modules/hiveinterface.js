const config = require('../config')
const logger = require('./logger')

const axios = require('axios')
const path = require('path')

const url = config.hive.db_url
const username = config.hive.username
const password = config.hive.password
const folder = config.app.folder

let reports_path = path.resolve(__dirname + '/../reports/')
logger.info(reports_path)


exports.query = (query, name) => axios.post(config.hive.api, {
    query, url, username, password,
    filePath: `${reports_path}/${name}`
})
    .catch((err) => logger.error(`${reports_path}/${name}`))