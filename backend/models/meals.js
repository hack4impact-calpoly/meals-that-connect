const mongoose = require('mongoose')
const {mealsConnection} = require('../connections')

const mealSchema = new mongoose.Schema({
   clientID: {type: String, required: true},
   site: {type: String, required: true},
   routeNumber: {type: String, required: true},
   startDate: {type: String, required: true},

   firstName: {type: String, required: true},
   lastName: {type: String, required: true},
   address: {type: String, required: true},

   foodDays: {
      M: {type: Boolean, required: true},
      T: {type: Boolean, required: true},
      W: {type: Boolean, required: true},
      Th: {type: Boolean, required: true},
      F: {type: Boolean, required: true}
   },
   frozenNumber: {type: Number, required: true, default: 0},
   frozenDay: {type: String, required: false},
   noMilk: {type: Boolean, required: true, default: false},
   holidayFrozen: {type: Boolean, required: true, default: false},
   index: {type: Number, required: true},
})

const Meals = mealsConnection.model("meals", mealSchema)

module.exports = Meals
