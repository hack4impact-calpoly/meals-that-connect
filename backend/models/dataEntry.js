const mongoose = require("mongoose")
const {userConnection} = require('../connections');

const dataEntrySchema = new mongoose.Schema({
   firstName: String,
   lastName: String,
   email: String,
   password: String,
   isAuthenticated: Boolean,
   site: String
})

const DataEntry = userConnection.model("dataentriers", dataEntrySchema)

module.exports = DataEntry
