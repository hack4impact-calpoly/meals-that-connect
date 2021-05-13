const mongoose = require("mongoose")
const {userConnection} = require('../connections');

const volunteerSchema = new mongoose.Schema({
   volunteerID: {type: String, required: true},
   firstName: {type: String, required: true},
   lastName: {type: String, required: true},
   email: {type: String, required: true},
   password: {type: String, required: true},
   driver: Boolean,
   kitchenStaff: Boolean,
   isAuthenticated_driver: Boolean,
   isAuthenticated_kitchenStaff: Boolean,
   site: {type: String, required: true},
   phoneNumber: {type: String, required: true},
   availability: {
      M: {type: Boolean, required: true},
      T: {type: Boolean, required: true},
      W: {type: Boolean, required: true},
      Th: {type: Boolean, required: true},
      F: {type: Boolean, required: true}
   },
   notes: String,
   digitalSystem: Boolean,
   completedOrientation: Boolean,
   admin: {type: Boolean, required: true, default: false}
})

const Volunteer = userConnection.model("volunteers", volunteerSchema)

module.exports = Volunteer
