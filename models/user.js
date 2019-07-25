const mongoose = require('mongoose')

//User schema
let userSchema = mongoose.Schema({
    username: { type: String, required: true, unique: true },
    fullname: { type: String },
    group: { type: String, required: true },
    lastLoginDate: { type: Date, default: null },
    form_data: { type: Object, default: null },
    info: { type: Object }
})

let User = module.exports = mongoose.model('User', userSchema)