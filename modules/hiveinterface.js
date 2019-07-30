const config = require('../config')
const logger = require('./logger')

const axios = require('axios')

const url = config.hive.db_url
const username = config.hive.username
const password = config.hive.password
const folder = config.app.folder

let reports_path = __dirname + '/../reports/'

exports.query = (query, name) => axios.post(config.hive.api, {
    query, url, username, password,
    filePath: `${__dirname}/${folder}/${name}.xlsx`
})
    .catch((err) => logger.error(`${__dirname}/../${folder}/${name}.xlsx`))