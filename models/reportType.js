const mongoose = require('mongoose')

//ReportType schema
let reportTypeSchema = mongoose.Schema({
    name: { type: String, required: true, unique: true },
    description: String,
    query: { type: String, required: true },
    params: Object
})

let ReportType = module.exports = mongoose.model('ReportType', reportTypeSchema)