const mongoose = require('mongoose')

//Report schema
let ReportSchema = mongoose.Schema({
    filename: { type: String, required: true },
    size: Number,
    path: String,
    report: { type: mongoose.Schema.Types.ObjectId, ref: 'ReportType' },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    query: { type: String, required: true },
    completedAt: { type: Boolean, default: false },
    requestedAt: { type: Date, default: new Date() },
    completedAt: Date,
})

let Report = module.exports = mongoose.model('Report', ReportSchema)