const mongoose = require('mongoose')
const express = require('express')
const router = express.Router()

const moment = require('moment')

const Meal = require("../models/meals")
const Client = require("../models/clients")

// Takes in the given data (Monday of the week) and
// the client and posts/updates the entry in the database
// to the correct data and preferences of the client.

router.post('/', async (req, res) => {
   const {date, client} = req.body
   
   var meal;

   meal = new Meal({
      'clientID': client._id, 
      'site': client.site,
      'routeNumber': client.routeNumber, 
      'startDate': date,
      'mealNumber': client.mealNumber, 
      'foodDays': client.foodDays, 
      'frozenNumber': client.frozenNumber, 
      'frozenDay': client.frozenDay,
      'index': client.index})
 
   meal.save();
   console.log("meal successfully added");
   res.send("meal successfully added");

});

router.post('/siteTotals', async (req, res) => {
  const {site, week} = req.body
  Meal.find({site: site}, function (err, data) {
    if (err) {
      console.log(err)
    }
    else {
      console.log(week)
      console.log((moment(week)).week())
      data = data.sort((a, b) => (a.routeNumber > b.routeNumber) ? 1 : -1 )
      data = data.filter(function (client) {return (moment(client.startDate)).week() === (moment(week)).week()})
      console.log(data)
      let meals = {}
      let prevRoute = null
      let routeData = []
      let routes = []
      for (let i = 0; i < data.length; i++) {
          let client = data[i]

          if (i > 0 && client.routeNumber != prevRoute) {
              meals[prevRoute] = routeData
              routes.push(prevRoute)
              routeData = []
          }
          prevRoute = client.routeNumber
          routeData.push(client)
      }
      if (routeData.length > 0) {
          meals[prevRoute] = routeData
          routes.push(prevRoute)
      }
      let mealTotals = []
      for (let i = 0; i < routes.length; i++) {
        mealTotals.push(getRouteTotals(meals[routes[i]]))
      }  
      res.send({"meals": mealTotals, "routes": routes})
    }
  })
})

router.post('/routeSite', async (req, res) => {
  const {routeNumber, site} = req.body
  Meal.find({site: site, routeNumber: routeNumber}, function (err, clients) {
    if (err) { console.log(err) }
    else {
      res.send(clients)
    }
  })
})

router.post('/site', async (req, res) => {
  const {site, week} = req.body
  console.log("here")
  console.log(site)
  console.log(week)
  Meal.find({site: site, index: {$exists:true}}, function (err, clients) {
    if (err) {
      console.log(err)
    }
    else {
      clients = clients.sort((a, b) => (a.routeNumber > b.routeNumber) ? 1 : (a.routeNumber < b.routeNumber) ? -1 : (a.index >b.index) ? 1 : -1 )
      clients = clients.filter(function (client) {return (moment(client.startDate)).week() === (moment(week)).week()})
      console.log(clients)
      console.log(week)
      console.log((moment(week)).week())
      for (let i = 0; i < clients.length; i++) {
        clients[i].index = i
      }
      res.send(clients)
    }
  })
})

router.get('/all', async (req, res) => {
  Meal.find({}, function (err, clients) {
    if (err) {
      console.log(err)
    }
    else {
      res.send(clients)
    }
  })
})

router.post('/update-routes', async (req, res) => {
   const {id, key, data} = req.body

   var query = {}
   query[key] = data;

   Meal.updateOne({'clientID': id}, query)
    .then(function(result) {
        if (!result) {
          console.log("Error in updating info");
          res.send("Error in updating info");
        } else {
          console.log("Information updated");
          res.send("Information updated");
          }
    })
});

router.post('/update-client-routes', async (req, res) => {
  const clients = req.body

  for (let i = 0; i < clients.length; i++) {
    Meal.updateOne({'clientID': clients[i].id}, {'index': clients[i].index})
    .then(function(result) {
        if (!result) {
          console.log("Error in updating info");
          res.send("Error in updating info");
          return;
        } else {
          console.log("Information updated");
          }
    })
  }

  res.send("Information updated");
});

function getRouteTotals(clientList) {
    var days = ["M", "T", "W", "Th", "F"]
    var frozenTotal = [0,0,0,0,0];
    var mealTotal = [0,0,0,0,0];
    for (var index in clientList) {
      for (var day in days) {
        if (clientList[index].foodDays[days[day]]) {
          mealTotal[day] += clientList[index].mealNumber
        }
                
        if (clientList[index].frozenDay == days[day]){
          frozenTotal[day] += clientList[index].frozenNumber
        }
      }
    }
    var routeTotals = {"frozen": frozenTotal, "meals" : mealTotal}
    return routeTotals
  }

module.exports = router;


module.exports = router;
