const mongoose = require("mongoose")

const siteManagerSchema = new mongoose.Schema({
   firstName: String,
   lastName: String,
   email: String,
   password: String,
   isAuthenticated: Boolean,
   site: String
})

const SiteManager = mongoose.model("siteManager", siteManagerSchema)

module.exports = SiteManager

