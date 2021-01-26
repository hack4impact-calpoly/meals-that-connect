const mongoose = require('mongoose')

const clientSchema = new mongoose.Schema({
   firstName: {type: String, required: true},
   lastName: {type: String, required: true},
   address: {type: String, required: true},
   foodDays: {
      M: Boolean,
      T: Boolean,
      W: Boolean,
      Th: Boolean,
      F: Boolean
   },
   frozenNumber: {type: Number, required: true, default: 0},
   frozenDay: {
      M: Boolean,
      T: Boolean,
      W: Boolean,
      Th: Boolean,
      F: Boolean
   },
   phoneNumber: {type: String, required: true},
   emergencyContact: String,
   emergencyPhone: String,
   noMilk: {type: Boolean, required: true, default: false},
   mealNumber: {type: Number, required: true, default: 1},
   specialInstructions: String,
   clientC2: {type: Boolean, required: true},
   NE: String,
   email: String,
   holidayFrozen: {type: Boolean, required: true, default: false},
   routeNumber: {type: String, required: true},
   site: {type: String, required: true}

})

const client = mongoose.model("Clients", clientSchema)

module.exports = client
