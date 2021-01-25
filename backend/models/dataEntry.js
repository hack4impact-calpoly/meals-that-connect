const mongoose = require("mongoose")

const dataEntrySchema = new mongoose.Schema({
   firstName: String,
   lastName: String,
   email: String,
   password: String,
   isAuthenticated: Boolean,
   site: String
})

const DataEntry = mongoose.model("dataentriers", dataEntrySchema)

module.exports = DataEntry
