const mongoose = require('mongoose')

//base schema
let baseSchema = mongoose.Schema({
    bs_id: { type: Number },
    market_key: { type: String },
    region: { type: String },
    city: { type: String },
    district: { type: String },
    latitude: { type: String },
    longitude: { type: String },
    lac: { type: Number },
    cell_id: { type: Number },
    standard: { type: String },
    visible: { type: Boolean, default: false }
})

let Base = module.exports = mongoose.model('Base', baseSchema)