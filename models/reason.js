const mongoose = require('mongoose')

//reason schema
let reasonSchema = mongoose.Schema({
    disconnect_reason_code: { type: Number },
    disconnect_reason_desc: { type: String },
    description_eng: { type: String },
    visible: { type: Boolean, default: false }
})

let Reason = module.exports = mongoose.model('Reason', reasonSchema)