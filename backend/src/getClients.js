const mongoose = require('mongoose')
const express = require('express');
const router = express.Router();

const Client = require("../models/clients")

router.post('/routeSiteClients', async (req, res) => {
  const {route, site} = req.body
  Client.find({site: site, routeNumber: route}, function (err, clients) {
    if (err) { console.log(err) }
    else {
      res.send(clients)
    }
  })
})

router.post('/routeSiteDay', async (req, res) => {
  const {routeNumber, site, day} = req.body
  var totals = await getClientsByRouteSiteDay(routeNumber, site, day)
  res.send(totals)
})

router.get('/siteClients', async (req, res) => {
  const {site} = req.body
  const clientList = getClientsBySite(site)

  res.send(clientList)
})

router.get('/allClients', async (req, res) => {
  const clientList = getAll()
  res.send(clientList)
})

router.get('/routeTotals', async (req, res) => {
  const {site, day} = req.body
  const totals = getClientTotals(day, site)
  res.send(totals)
})

async function getClientsByRouteSiteDay(routeNumber, site, day) {
  var clientList = await getClientsByRouteSite(routeNumber, site)
  var totals = {"frozen": 0, "meals" : 0}
  for (var index in clientList) {
    if (clientList[index].foodDays[day]) {
      totals.meals += clientList[index].mealNumber
    }
    if (clientList[index].frozenDay[day]) {
      totals.frozen += clientList[index].frozenNumber
    }
  }
  return totals
}

async function getClientsByRouteSite(routeNum, siteName) {
  return await Client.find({routeNumber: routeNum, site: siteName}, function (err, clients) {
    if (err) {
      console.log(err)
    }
    else {
      return clients
    }
  })
}

async function getClientsBySite(site) {
  return await Client.find({site: site})
}

async function getAll() {
  return await Client.find({})
}

function getClientTotals(day, site) {
  var frozen = 0
  var noMilk = 0
  var reg = 0;
  var totals = []
  var routes = ["1", "2", "3", "4A", "4B", "5", "6", "7", "8", "9"]
  var clientList;
  for (var route in routes) {
    clientList = getClientsByRouteSite(route, site)
    frozen = getFrozen(clientList, day)
    noMilk = getNoMilk(clientList)
    reg = getReg(clientList, day)
    totals.push({route: route, frozen: frozen, noMilk: noMilk, regular: reg})
  }
  return totals
}

function getFrozen(clientList, day) {
  var frozen = 0;
  for (var client in clientList) {
    if (client.frozenDay[day] === true) {
      frozen += client.frozenNumber
    }
  }
  return frozen
}

function getReg(clientList, day) {
  var reg = 0;
  for (var client in clientList) {
    if (client.foodDays[day] === true) {
      reg += client.mealNumber
    }
  }
  return reg
}

function getNoMilk(clientList, day) {
  var num = 0
  for (var client in clientList) {
    if (client.noMilk === true) {
      num += client.mealNumber
    }
  }
  return num
}

module.exports = router;