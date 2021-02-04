const mongoose = require("mongoose")
const {hoursConnection} = require('../connections');

const hourSchema = new mongoose.Schema({
   firstName: {type: String, required: true},
   lastName: {type: String, required: true},
   date: {type: Date, required: true},
   hours: {type: Number, required: true}
})

const Hours = hoursConnection.model("hours", hourSchema)

module.exports = Hours