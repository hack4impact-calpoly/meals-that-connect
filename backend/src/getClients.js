const mongoose = require('mongoose')
const client = require('../models/clients')
const adminUsername = "h4iadmin"
const adminPassword = "MTCpassword"
const url = `mongodb+srv://${adminUsername}:${adminPassword}@cluster1.qtgqg.mongodb.net/Clientele?retryWrites=true&w=majority`

mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  }).then(() => console.log('Connected to MongoDB'))

const Client = require("../models/clients")

async function getClientsByRouteSite(routeNum, site) {
  return await Client.find({routeNumber: routeNum, site: site})
}

async function getClientsBySite(site) {
   return await Client.find({site: site})
}

async function findAll() {
  let client = await Client.find({})
  console.log(client)
}

function getClientTotals(day, site) {
  clientList = getClientsBySite(site)
  var frozen;
  var noMilk;
  var reg;
  for (var i=0; i < clientList.length; i++) {
    clientList[i].frozenDay.
  }
}

findAll()
