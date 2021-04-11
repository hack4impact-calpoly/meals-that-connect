const mongoose = require('mongoose')
const {clientConnection} = require('../connections');

const clientSchema = new mongoose.Schema({
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
   site: {type: String, required: true},
   index: {type: Number, required: true}

})

const Client = clientConnection.model("Clients", clientSchema, "Clients")

module.exports = Client
