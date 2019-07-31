const config = require('../config')
const logger = require('./logger')

const axios = require('axios')
const path = require('path')

const url = config.hive.db_url
const username = config.hive.username
const password = config.hive.password
const folder = config.app.folder

let reports_path = __dirname + '/../reports/'

exports.query = (query, name) => axios.post(config.hive.api, {
    query, url, username, password,
    filePath: path.resolve(`${__dirname}/../test.xlsx`)
    // filePath: path.resolve(`${__dirname}/${folder}/${name}.xlsx`)
}, (err, result) => {
    console.log(path.resolve(`${__dirname}/../test.xlsx`))
    console.log(result)
})
    .catch((err) => logger.error(path.resolve(`${__dirname}/test.xlsx`)))