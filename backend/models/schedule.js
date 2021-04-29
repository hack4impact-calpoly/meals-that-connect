const mongoose = require('mongoose')
const {schedulesConnection} = require('../connections');

const scheduleSchema = new mongoose.Schema({
    site: {type: String, required: true},
    startDate: {type: Date, required: true},
    orders: {
        M:{
            volunteers: {type: Array, required: true, default: [] },
            mealPrep: {type: Array, required: true, default: [] },
            staff: {type: Number, required: true, default: 0},
            computer: {type: Number, required: true, default: 0} },
        T:{
            volunteers: {type: Array, required: true, default: [] },
            mealPrep: {type: Array, required: true, default: [] },
            staff: {type: Number, required: true, default: 0} ,
            computer: {type: Number, required: true, default: 0} },
        W:{
            volunteers: {type: Array, required: true, default: [] },
            mealPrep: {type: Array, required: true, default: [] },
            staff: {type: Number, required: true, default: 0} ,
            computer: {type: Number, required: true, default: 0} },
        Th:{
            volunteers: {type: Array, required: true, default: [] },
            mealPrep: {type: Array, required: true, default: [] },
            staff: {type: Number, required: true, default: 0} ,
            computer: {type: Number, required: true, default: 0} },
        F:{
            volunteers: {type: Array, required: true, default: [] },
            mealPrep: {type: Array, required: true, default: [] },
            staff: {type: Number, required: true, default: 0} ,
            computer: {type: Number, required: true, default: 0} },
        },
})

const Schedule = schedulesConnection.model("schedules", scheduleSchema, "schedules")

module.exports = Schedule
