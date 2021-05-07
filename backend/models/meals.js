const mongoose = require('mongoose')
const {mealsConnection} = require('../connections')

const mealSchema = new mongoose.Schema({
   clientID: {type: String, required: true},
   site: {type: String, required: true},
   routeNumber: {type: String, required: true},
   startDate: {type: Date, required: true},

   foodDays: {
      M: {type: Boolean, required: true},
      T: {type: Boolean, required: true},
      W: {type: Boolean, required: true},
      Th: {type: Boolean, required: true},
      F: {type: Boolean, required: true}
   },
   mealNumber: {type: Number, required: true, default: 1},
   frozenNumber: {type: Number, required: true, default: 0},
   frozenDay: {type: String, required: false},
   noMilk: {type: Boolean, required: true, default: false},
   holidayFrozen: {type: Boolean, required: true, default: false},
   index: {type: Number, required: true},
})

const Meals = mealsConnection.model("meals", mealSchema)

module.exports = Meals
