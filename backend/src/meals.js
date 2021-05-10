const mongoose = require('mongoose')
const express = require('express')
const router = express.Router()

const moment = require('moment')

const Meal = require("../models/meals")
const Client = require("../models/clients")

// Given a meal field and a value, update the client's meal data for the specified week
router.post('/update-field', async (req, res) => {
    const {date, clientID, key, value} = req.body

    var query = {}
    query[key] = value;

    Meal.updateOne({clientID: clientID, startDate: date}, query).then(function(updated) {
        if (!updated) {
            console.log("Error in updating meal");
        }
    })
    console.log("meal successfully updated");
    res.send("meal successfully updated");
});

router.post('/update-data', async (req, res) => {
    let {   id, 
            date, 
            foodDays,   
            frozenNumber, 
            frozenDay, 
            noMilk,   
            holidayFrozen, 
          } = req.body
    date = formatDate(date)

    Meal.updateOne({_id: id}, 
              { foodDays: foodDays,
                frozenNumber: frozenNumber,
                frozenDay: frozenDay,
                noMilk: noMilk,
                holidayFrozen: holidayFrozen})
      .then(function(result) {
          if (!result) {
            console.log("Error in updating info");
            res.send("Error in updating info");
            return;
          } else {
            console.log("Meal information updated");
            }
      })
    res.send("Information updated");
  });

// Takes in the given data (Monday of the week) and the client 
// Updates the meal with the client data if it exists, 
// Or creates a new meal with the client data if nonexistant 
async function existsMeal(client, week) {
    let output;
    await Meal.findOne({clientID: client._id, startDate: week}, function(err, meal) {
        if (meal == null) {
            console.log("Meal not found, creating new meal")
            var mealData = {
                'clientID': client._id, 
                'site': client.site,
                'routeNumber': client.routeNumber, 
                'startDate': week,
            
                'firstName': client.firstName,
                'lastName': client.lastName,
                'address': client.address,
            
                'foodDays': client.foodDays, 
                'frozenNumber': client.frozenNumber, 
                'frozenDay': client.frozenDay,
                'noMilk': client.noMilk, 
                'holidayFrozen': client.holidayFrozen,
            
                'routeNumber': client.routeNumber,
                'index': client.index 
            }
            meal = new Meal(mealData)
            meal.save()
            output = mealData
        }
        else {
            meal.routeNumber = client.routeNumber
            meal.firstName = client.firstName
            meal.lastName = client.lastName
            meal.address = client.address
            Meal.updateOne({clientID: client._id, startDate: week}, meal).then(function(updated) {
                if (!updated) {
                    console.log("Error in updating meal");
                }
            })
            output = meal
        }  
    })
    return output
}

router.post('/siteTotals', (req, res) => {
    let {site, week} = req.body
    let currMonday = formatDate(getMonday(new Date()))
    console.log("calling site totals")
    week = formatDate(week)
    if (currMonday > week) {
        Meal.find({site: site}, function (err, data) {
        if (err) {
            console.log(err)
            res.status(404).send("error")
        }
        else {
            let mealData = sortFormatMeals(data)
            let mealTotals = []
            for (let i = 0; i < routes.length; i++) {
            mealTotals.push(getRouteTotals(mealData.meals[mealData.routes[i]]))
            }  
            res.send({"meals": mealTotals, "routes": routes})
        }
        })
    }
    else {
        Client.find({site: site}, async function (err, clients) {
            if (err) {
                console.log(err)
                res.status(404).send("error")
            }
            else {
                data = []
                for (let i = 0; i < clients.length; i++) {
                    existsMeal(clients[i], week).then(meal => {
                        data.push(meal)
                        if (data.length == clients.length) {
                            let {routes, meals} = sortFormatMeals(data)
                            let mealTotals = []
                            for (let i = 0; i < routes.length; i++) {
                            mealTotals.push(getRouteTotals(meals[routes[i]]))
                            }  
                            res.send({"meals": meals, "routes": routes, "totals": mealTotals})
                        }
                    })
                }
            }
        })
    }
})

function getMonday(d) {
    d = new Date(d);
    var day = d.getDay(),
        diff = d.getDate() - day + (day == 0 ? -6:1); 
    return new Date(d.setDate(diff));
  }
  
  function formatDate(date) {
    return (moment(date).format("YYYY-MM-DD"));
  }

router.post('/routeSite', async (req, res) => {
  const {routeNumber, site} = req.body
  Meal.find({site: site, routeNumber: routeNumber}, function (err, clients) {
    if (err) { console.log(err) }
    else {
      res.send(clients)
    }
  })
})

function sortFormatMeals(data) {
  data = data.sort((a, b) => (a.routeNumber > b.routeNumber) ? 1 : -1 )
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
  return {"meals": meals, "routes": routes}
}

router.post('/site', async (req, res) => {
  const {site, week} = req.body
  Meal.find({site: site, index: {$exists:true}}, function (err, clients) {
    if (err) {
      console.log(err)
    }
    else {
      clients = clients.sort((a, b) => (a.routeNumber > b.routeNumber) ? 1 : (a.routeNumber < b.routeNumber) ? -1 : (a.index >b.index) ? 1 : -1 )
      clients = clients.filter(function (client) {return (moment(client.startDate)).week() === (moment(week)).week()})
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
   const {id, key, data,} = req.body

   var query = {}
   query[key] = data;

   Meal.updateOne({'clientID': id}, query)
    .then(function(result) {
        if (!result) {
          console.log("Error in updating info");
          res.send("Error in updating info");
        } else {
          console.log("Meal information updated");
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

  router.post('/get-clients', async (req, res) => {
    const {site} = req.body
    Client.find({site: site}, function (err, clients) {
      if (err) { 
        console.log(err) 
        res.send("Invalid site")
      }
      else {
        output = {}
        clients.forEach(client => {
          let ID = client._id
          let clientOutput = {
            firstName: client.firstName,
            lastName: client.lastName,
            address: client.address,
          }
          output[ID] = clientOutput
        })
        res.send(output)
      }
    })
  });

module.exports = router;
