const mongoose = require("mongoose")
const {hoursConnection} = require('../connections');

const hourSchema = new mongoose.Schema({
   volunteerID: {type: String, required: true},
   date: {type: Date, required: true},
   home: {type: Number, required: true, default: 0},
   dinner: {type: Number, required: true, default: 0},
   signature: {type: String, required: true, default: "no"}
})

const Hours = hoursConnection.model("hours", hourSchema)

module.exports = Hours
