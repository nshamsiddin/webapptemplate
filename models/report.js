const mongoose = require('mongoose')

//Report schema
let ReportSchema = mongoose.Schema({
    filename: { type: String },
    size: Number,
    path: String,
    report: { type: mongoose.Schema.Types.ObjectId, ref: 'ReportType' },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    query: { type: String },
    status: { type: Number, default: 0 },
    requestedAt: { type: Date, default: new Date() },
    completedAt: { type: Boolean, default: false },
    completedAt: Date,
    comment: { type: String, default: 'In progress' },
})

let Report = module.exports = mongoose.model('Report', ReportSchema)