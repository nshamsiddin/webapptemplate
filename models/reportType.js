const mongoose = require('mongoose')

//ReportType schema
let reportTypeSchema = mongoose.Schema({
    name: { type: String, required: true, unique: true },
    query: { type: String, required: true },
    queryExtra: { type: String },
    replace: { type: Object }
})

let ReportType = module.exports = mongoose.model('ReportType', reportTypeSchema)