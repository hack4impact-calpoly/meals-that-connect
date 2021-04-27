const mongoose = require('mongoose')
const express = require('express');
const router = express.Router();

const Client = require("../models/clients")

router.post('/addClient', async (req, res) => {
  const { firstName, 
          lastName, 
          address, 
          foodDays, 
          frozenNumber, 
          frozenDay, 
          phoneNumber, 
          emergencyNumber, 
          emergencyContact, 
          emergencyPhone, 
          noMilk, 
          mealNumber, 
          specialInstructions, 
          clientC2, 
          NE, 
          email, 
          holidayFrozen, 
          routeNumber, 
          site, 
          index} = req.body
  var client = new Client({ firstName,
                            lastName, 
                            address, 
                            foodDays, 
                            frozenNumber,
                            frozenDay, 
                            phoneNumber, 
                            emergencyNumber, 
                            emergencyContact, 
                            emergencyPhone, 
                            noMilk, 
                            mealNumber, 
                            specialInstructions, 
                            clientC2, 
                            NE, 
                            email, 
                            holidayFrozen, 
                            routeNumber, 
                            site, 
                            index})
  client.save()
  .catch(err => {
                  console.log(err)
                  res.send(500).send("Internal server error")})
  console.log("succcessfully added client")
  res.status(200).send("success")
})

router.post('/siteTotals', async (req, res) => {
  const {site} = req.body
  Client.find({site: site}, function (err, data) {
    if (err) {
      console.log(err)
    }
    else {
      data = data.sort((a, b) => (a.routeNumber > b.routeNumber) ? 1 : -1 )
      let clients = {}
      let prevRoute = null
      let routeData = []
      let routes = []
      for (let i = 0; i < data.length; i++) {
          let client = data[i]

          if (i > 0 && client.routeNumber != prevRoute) {
              clients[prevRoute] = routeData
              // make sure a null route does not get inserted into routes array
              if (prevRoute !== null)
                routes.push(prevRoute)
              routeData = []
          }
          // makes sure the -1 route's data does not get inserted into routeData
          if (client.routeNumber !== "-1"){
            prevRoute = client.routeNumber
            routeData.push(client)
          }
      }
      if (routeData.length > 0) {
          clients[prevRoute] = routeData
          routes.push(prevRoute)
      }
      let mealTotals = []
      for (let i = 0; i < routes.length; i++) {
        mealTotals.push(getRouteTotals(clients[routes[i]]))
      }  
      res.send({"meals": mealTotals, "routes": routes})
    }
  })
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

router.post('/site', async (req, res) => {
  const {site} = req.body
  Client.find({site: site, index: {$exists:true}}, function (err, clients) {
    if (err) {
      console.log(err)
    }
    else {
      clients = clients.sort((a, b) => (a.routeNumber > b.routeNumber) ? 1 : (a.routeNumber < b.routeNumber) ? -1 : (a.index >b.index) ? 1 : -1 )
      for (let i = 0; i < clients.length; i++) {
        clients[i].index = i
      }
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


router.post('/update-routes', async (req, res) => {
   const {id, key, data} = req.body

   var query = {}
   query[key] = data;

   Client.updateOne({'_id': id}, query)
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
    Client.updateOne({'_id': clients[i].id}, {'index': clients[i].index})
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
