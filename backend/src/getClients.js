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
  const {routeNumber, site} = req.body
  var totals = await getTotalsByRouteSite(routeNumber, site)
  res.send(totals)
})

router.post('/routeSite', async (req, res) => {
  const {routeNumber, site} = req.body
  Client.find({site: site, routeNumber: routeNumber}, function (err, clients) {
    if (err) { console.log(err) }
    else {
      res.send(clients)
    }
  })
})

router.post('/route', async (req, res) => {
  const {routeNumber} = req.body
  Client.find({routeNumber: routeNumber}, function (err, clients) {
    if (err) { console.log(err) }
    else {
      res.send(clients)
    }
  })
})

router.post('/site', async (req, res) => {
  const {site} = req.body
  Client.find({site: site}, function (err, clients) {
    if (err) {
      console.log(err)
    }
    else {
      res.send(clients)
    }
  })
})

router.get('/all', async (req, res) => {
  Client.find({}, function (err, clients) {
    if (err) {
      console.log(err)
    }
    else {
      res.send(clients)
    }
  })
})

router.post('/routeTotals', async (req, res) => {
  const {site, day} = req.body
  var totals = await getClientTotals(day, site)
  res.send(totals)
})

async function getTotalsByRouteSite(route, site) {
  var clientList = await getClientsByRouteSite(route, site)
  var days = ["M", "T", "W", "Th", "F"]
  var totals = [];
  var routeTotals = {"frozen": [], "meals" : []}
  var frozenTotal = 0;
  var mealTotal = 0;
  for (var day in days) {
    for (var index in clientList) {
      if (clientList[index].foodDays[days[day]]) {
        mealTotal += clientList[index].mealNumber
      }
      if (clientList[index].frozenDay[days[day]]) {
        frozenTotal += clientList[index].frozenNumber
      }
    }
    routeTotals["frozen"].push(frozenTotal);
    routeTotals["meals"].push(mealTotal);
    totals.push(routeTotals);
    frozenTotal = 0;
    mealTotal = 0;
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

async function getClientTotals(day, site) {
  var frozen = 0
  var noMilk = 0
  var reg = 0;
  var totals = []
  var routes = ["1", "2", "3", "4A", "4B", "5", "6", "7", "8", "9"]
  for (var route in routes) {
    var clientList = await getClientsByRouteSite(routes[route], site)
    frozen = getFrozen(clientList, day)
    noMilk = getNoMilk(clientList, day)
    reg = getReg(clientList, day)
    totals.push({route: routes[route], frozen: frozen, noMilk: noMilk, regular: reg})
    frozen = 0
    noMilk = 0
    reg = 0
  }
  return totals
}

function getFrozen(clientList, day) {
  var frozen = 0;
  for (var index in clientList) {
    if (clientList[index].frozenDay[day]) {
      frozen += clientList[index].frozenNumber
    }
  }
  return frozen
}

function getReg(clientList, day) {
  var reg = 0;
  for (var index in clientList) {
    if (clientList[index].foodDays[day] && !clientList[index].noMilk) {
      reg += clientList[index].mealNumber
    }
  }
  return reg
}

function getNoMilk(clientList, day) {
  var whiteBag = 0
  for (var index in clientList) {
    if (clientList[index].foodDays[day] && clientList[index].noMilk) {
      whiteBag += clientList[index].mealNumber
    }
  }
  return whiteBag
}

module.exports = router;
