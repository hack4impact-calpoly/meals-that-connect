const mongoose = require("mongoose")

const siteManagerSchema = new mongoose.Schema({
   firstName: String,
   lastName: String,
   email: String,
   password: String,
   isAuthenticated: Boolean,
   site: String
})

const SiteManager = mongoose.model("sitemanagers", siteManagerSchema)

module.exports = SiteManager

