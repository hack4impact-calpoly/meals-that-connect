const mongoose = require("mongoose")
const {userConnection} = require('../connections');

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

const Volunteer = userConnection.model("volunteers", volunteerSchema)

module.exports = Volunteer
