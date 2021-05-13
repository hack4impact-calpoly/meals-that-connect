const mongoose = require("mongoose")
const { userConnection } = require("../connections")

const siteManagerSchema = new mongoose.Schema({
   firstName: String,
   lastName: String,
   email: String,
   password: String,
   isAuthenticated: Boolean,
   site: String, 
   admin: {type: Boolean, required: true, default: false}
})

const SiteManager = userConnection.model("sitemanagers", siteManagerSchema)

module.exports = SiteManager

