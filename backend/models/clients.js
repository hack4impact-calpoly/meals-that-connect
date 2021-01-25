const mongoose = require('mongoose')

const clientSchema = new mongoose.Schema({
   firstName: String,
   lastName: String,
   address: String,
   foodDays: {
      M: Boolean,
      T: Boolean,
      W: Boolean,
      Th: Boolean,
      F: Boolean
   },
   frozenNumber: Number,
   frozenDay: {
      M: Boolean,
      T: Boolean,
      W: Boolean,
      Th: Boolean,
      F: Boolean
   },
   phoneNumber: String,
   emergencyContact: String,
   emergencyPhone: String,
   noMilk: Boolean,
   mealNumber: Number,
   specialInstructions: String,
   clientC2: Boolean,
   NE: String,
   email: String,
   holidayFrozen: Boolean,
   routeNumber: String,
   site: String

})

const client = mongoose.model("Clients", clientSchema)

module.exports = client
