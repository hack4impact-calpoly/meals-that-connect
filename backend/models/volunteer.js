const mongoose = require("mongoose")

const volunteerSchema = new mongoose.Schema({
   firstName: String,
   lastName: String,
   email: String,
   password: String,
   driver: Boolean,
   kitchenStaff: Boolean,
   isAuthenticated_driver: Boolean,
   isAuthenticated_kitchenStaff: Boolean,
   site: String
})

const Volunteer = mongoose.model("Volunteer", volunteerSchema)

module.exports = Volunteer
