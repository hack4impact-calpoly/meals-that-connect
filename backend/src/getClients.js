const mongoose = require('mongoose')
const express = require('express');
const router = express.Router();

const Client = require("../models/clients")

router.post('/addClient', async (req, res) => {
  const {firstName, lastName, address, foodDays, frozenNumber, frozenDay, phoneNumber, emergencyNumber, emergencyContact, emergencyPhone, noMilk, specialInstructions, clientC2, NE, email, holidayFrozen, routeNumber, site} = req.body
  console.log("Adding client")
  Client.findOne({'email': email}).then(function(result) {
  if (result) {
    console.log("email already in use")
    res.status(404).send("email already in use")     
  }
  else {
    Client.countDocuments({site: site, routeNumber: routeNumber}, function(err, index) {
      if (err) {
        console.log(err)
        res.send(500).send("Internal server error")
      }
      else {
        var client = new Client({firstName, lastName, address, foodDays, frozenNumber, frozenDay, phoneNumber, emergencyNumber, emergencyContact, emergencyPhone, noMilk, specialInstructions, clientC2, NE, email, holidayFrozen, routeNumber, site, index})
        client.save()
        console.log("succcessfully added client")
        res.status(200).send("success")
      }
    })
  }
  }).catch(err => {
    console.log(err)
    res.send(500).send("Internal server error")
  })
})

router.post('/delete', async (req, res) => {
  const { id } = req.body
  Client.deleteOne({_id: id}).then(function(result) {
    if (result) {
      console.log("Deleted client")
      res.status(200).send("Deleted")   
      return   
    }
    else {
      res.send(500).send("Failed to delete")
    }
    }).catch(err => {
      res.send(500).send("Failed to delete")
  })
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

router.post('/id', async (req, res) => {
  console.log("getting client")
  const {_id} = req.body
  Client.findOne({_id: _id}, function (err, client) {
    if (err) {
      console.log(err)
    }
    else {
      res.send(client)
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

router.post('/update-client', async (req, res) => {
  const { firstName,
          lastName,
          address,
          foodDays,
          frozenNumber,
          frozenDay,
          phoneNumber,
          emergencyContact,
          emergencyPhone,
          noMilk,
          specialInstructions,
          clientC2,
          NE,
          email,
          holidayFrozen,
          routeNumber,
          site,
          index,
          id} = req.body

  Client.updateOne({'_id': id}, 
            { firstName: firstName,
              lastName: lastName,
              address: address,
              foodDays: foodDays,
              frozenNumber: frozenNumber,
              frozenDay: frozenDay,
              phoneNumber: phoneNumber,
              emergencyContact: emergencyContact,
              emergencyPhone: emergencyPhone,
              noMilk: noMilk,
              specialInstructions: specialInstructions,
              clientC2: clientC2,
              NE: NE,
              email: email,
              holidayFrozen: holidayFrozen,
              routeNumber: routeNumber,
              site: site,
              index: index})
    .then(function(result) {
        if (!result) {
          console.log("Error in updating info");
          res.send("Error in updating info");
          return;
        } else {
          console.log("Information updated");
          }
    })
  res.send("Information updated");
});

router.post('/update-data', async (req, res) => {
  const { id, 
          firstName, 
          lastName, 
          address,   
          phoneNumber, 
          emergencyContact, 
          emergencyPhone,   
          specialInstructions, 
          clientC2, 
          NE, 
          email, 
        } = req.body

  console.log(req.body)
  console.log(id)

  Client.updateOne({'_id': id}, 
            { firstName: firstName,
              lastName: lastName,
              address: address,
              phoneNumber: phoneNumber,
              emergencyContact: emergencyContact,
              emergencyPhone: emergencyPhone,
              specialInstructions: specialInstructions,
              clientC2: clientC2,
              NE: NE,
              email: email})
    .then(function(result) {
        if (!result) {
          console.log("Error in updating info");
          res.send("Error in updating info");
          return;
        } else {
          console.log("Client information updated");
          }
    })
  res.send("Information updated");
});

function getRouteTotals(clientList) {
    var days = ["M", "T", "W", "Th", "F"]
    var whiteBagTotal = [0, 0, 0, 0, 0]
    var frozenTotal = [0, 0, 0, 0, 0];
    var mealTotal = [0, 0, 0, 0, 0];
    for (var index in clientList) {
      for (var day in days) {
        if (clientList[index].foodDays[days[day]]) {
          if(clientList[index].noMilk == false) {
            mealTotal[day] += 1
          }
          else {
            whiteBagTotal[day] += 1
          }
        }
                
        if (clientList[index].frozenDay == days[day]){
          frozenTotal[day] += clientList[index].frozenNumber
        }
      }
    }
    var routeTotals = {"frozen": frozenTotal, "meals" : mealTotal, "whitebag": whiteBagTotal}
    return routeTotals
  }

module.exports = router;
