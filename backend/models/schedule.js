const mongoose = require('mongoose')
const {schedulesConnection} = require('../connections');

const scheduleSchema = new mongoose.Schema({
    site: {type: String, required: true},
    startDate: {type: Date, required: true},
    routes: {type: mongoose.Schema.Types.Mixed, required: true},
    mealPrep: {type: Array, required: true, default: []},
    staff: {type: Array, required: true, default: []},
    computer: {type: Array, required: true, default: []},
})

const Schedule = schedulesConnection.model("schedules", scheduleSchema, "schedules")

module.exports = Schedule
