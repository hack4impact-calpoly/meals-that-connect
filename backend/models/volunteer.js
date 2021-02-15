const mongoose = require("mongoose")
const {userConnection} = require('../connections');

const volunteerSchema = new mongoose.Schema({
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
   completedInfo: Boolean
})

const Volunteer = userConnection.model("volunteers", volunteerSchema)

module.exports = Volunteer
