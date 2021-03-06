const mongoose = require('mongoose')
const express = require('express')
const router = express.Router()
const moment = require('moment')

const Meal = require("../models/meals")
const Client = require("../models/clients")
const {decodeToken} = require("./token.js")

/*
  Contains methods:
    siteTotals: returns the meals, routes, and meal totals for a given site and week
    routeOverviewDay: returns the list of clients and their ordered meals for a given site and day
        Used to generate the route pdfs
    routeOverviewDayRoute: returns the list of clients and their ordered meals for a given site and day and route
        Used to generate the route pdfs
    update-field: Update 1 field for a meal object given the clientID and date
    update-data: Update all the data for a meal object given a meal ID
*/

// Given a meal field and a value, update the client's meal data for the specified week
router.post('/update-field', async (req, res) => {
    const {date, clientID, key, value, token} = req.body

    let userData = decodeToken(token)
    if (userData == null) {
      res.status(403).send("Unauthorized user")
      return
    }

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
            token,
          } = req.body
    date = formatDate(date)

    let userData = decodeToken(token)
    if (userData == null) {
      res.status(403).send("Unauthorized user")
      return
    }

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


// This function returns the correct list of clients 
// that need deliveries for a given day
router.post('/routeOverviewDay', (req, res) => {
  // takes in these parameters from the front end.
  // site is used to search and day which is a string M, T, W, Th, F
  let { day, week, token } = req.body
  week = formatDate(week)

  let userData = decodeToken(token)
  if (userData == null) {
    res.status(403).send("Unauthorized user")
    return
  }
  let site = userData.site

  Client.find({site: site}, function (err, clients) {
    if (err) {
      console.log(err) 
      res.status(404).send("error")
    } else {
      var clientsWithMeals = []
      for (let i = 0; i < clients.length; i++) {        
        findClientMeal(clients[i], week).then(meal => {
          var client = {}
          if (meal != null) {
            client.firstName = clients[i].firstName
            client.lastName = clients[i].lastName
            client.address = clients[i].address
            client.phoneNumber = clients[i].phoneNumber
            client.routeNumber = clients[i].routeNumber
            client.emergencyContact = clients[i].emergencyContact
            client.emergencyPhone = clients[i].emergencyPhone
            client.specialInstructions = clients[i].specialInstructions
            client.foodDays = meal.foodDays
            client.frozenNumber = meal.frozenNumber
            client.frozenDay = meal.frozenDay
            client.noMilk = meal.noMilk
          
            clientsWithMeals.push(client)
          }

          if (i == clients.length - 1) {
            var sortedRoutes = SortClients(clientsWithMeals, day)
            res.send(sortedRoutes)
          }
        })
      }
    }
  })
})

// This function returns the correct list of clients 
// that need deliveries for a given day for a given site for a given route
router.post('/routeOverviewDayRoute', (req, res) => {
  // takes in these parameters from the front end.
  // site is used to search and day which is a string M, T, W, Th, F
  let {site, day, week, routeNumber, token} = req.body
  week = formatDate(week)
  console.log(req.body)

  let userData = decodeToken(token)
  if (userData == null) {
    res.status(403).send("Unauthorized user")
    return
  }

  Client.find({site: site, routeNumber: routeNumber}, function (err, clients) {
    if (err) {
      console.log(err) 
      res.status(404).send("error")
    } else {
      console.log(clients)
      var clientsWithMeals = []
      for (let i = 0; i < clients.length; i++) {        
        findClientMeal(clients[i], week).then(meal => {
          var client = {}
          if (meal != null) {
            client.firstName = clients[i].firstName
            client.lastName = clients[i].lastName
            client.address = clients[i].address
            client.phoneNumber = clients[i].phoneNumber
            client.routeNumber = clients[i].routeNumber
            client.emergencyContact = clients[i].emergencyContact
            client.emergencyPhone = clients[i].emergencyPhone
            client.specialInstructions = clients[i].specialInstructions
            client.foodDays = meal.foodDays
            client.frozenNumber = meal.frozenNumber
            client.frozenDay = meal.frozenDay
            client.noMilk = meal.noMilk
          
            clientsWithMeals.push(client)
          }

          if (i == clients.length - 1 || clients.length == 0) {
            var sortedRoutes = SortClients(clientsWithMeals, day)
            res.send(sortedRoutes)
          }
        })
      }
    }
  })
})


router.post('/siteTotals', (req, res) => {
  let {week, token} = req.body
  console.log(req.body)
  let currMonday = formatDate(getMonday(new Date()))
  let userData = decodeToken(token)
  if (userData == null) {
    res.status(403).send("Unauthorized user")
    return
  }
  let site = userData.site
  week = formatDate(week)

  console.log("calling site totals")

  if (currMonday > week) {
      Meal.find({site: site, startDate: week}, function (err, data) {
      if (err) {
          console.log(err)
          res.status(404).send("error")
      }
      else {
          console.log("Getting meal data")
          let {routes, meals} = sortFormatMeals(data)
          let mealTotals = []
          var totals = {"meals": 0, "routes": 0, "totals": 0};
          for (let i = 0; i < routes.length; i++) {
            mealTotals.push(getRouteTotals(meals[routes[i]]))
            
          }  
          res.send({"meals": meals, "routes": routes, "totals": mealTotals})
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
              let total = clients.length
              for (let i = 0; i < clients.length; i++) {
                  if (clients[i].routeNumber !== '-1') {
                    existsMeal(clients[i], week).then(meal => {
                        data.push(meal)
                        if (data.length == total) {
                            let {routes, meals} = sortFormatMeals(data)
                            let mealTotals = []
                            for (let i = 0; i < routes.length; i++) {
                            mealTotals.push(getRouteTotals(meals[routes[i]]))
                            }  
                            res.send({"meals": meals, "routes": routes, "totals": mealTotals})
                        }
                    })
                  }
                  else {
                    total -= 1
                  }
              }
          }
      })
  }
})


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
            meal.index = client.index
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

async function findClientMeal(client, week) {
  let data
  await Meal.findOne({clientID: client._id, startDate: week}, function(err, meal) {
    if (err) {
      console.log("error")
    }
    else {

      data = meal
    }
  })
  return data
}

// This function will return a sorted list of clients by route number.
// sorts from ascending order and also sorts clients by their index value
function SortClients(clients, day) {
  // removes clients without the day
  for (let i = 0; i < clients.length; i++) {
    let client = clients[i]

    if (client.foodDays[day] == false) {
      clients.splice(i, 1) // removes client from list at index i, 1 is number of elements removed
      i--; // decrement i to take into account for removing an element from the list
    }
  }
  // sorts clients by route then by index in increasing order
  clients.sort(function(a, b) {
    // localeCompare compares two string values if equal (0) sort by index
    return a.routeNumber.localeCompare(b.routeNumber) || a.index - b.index
  })
  // get number of routes in array bad implementation I'm tired... sorry!
  // code between the ******** should be rewritten to be cleaner. Brain fried.
  // ********
  let clientsByRoute = []
  let numRoutes = []
  for (let j = 0; j < clients.length; j++) {
      // if route not already in the array add it
      if (numRoutes.includes(clients[j].routeNumber) === false) {
          numRoutes.push(clients[j].routeNumber)
          var temp = []
          clientsByRoute.push(temp)
      }
  }

  // iterate through clients add client to array if routes match. Otherwise add to next array
  // this puts clients in a 2d array
  // From line
  let index = 0
  for (let j = 0; j < clients.length; j++) {
    if (numRoutes[index].localeCompare(clients[j].routeNumber) === 0)
        clientsByRoute[index].push(clients[j])
    else {
      index += 1
      clientsByRoute[index].push(clients[j])
    }
  } 
 // ************ 

  return clientsByRoute
}

function getMonday(d) {
    d = new Date(d);
    var day = d.getDay(),
        diff = d.getDate() - day + (day == 0 ? -6:1); 
    return new Date(d.setDate(diff));
  }
  
  function formatDate(date) {
    return (moment(date).format("YYYY-MM-DD"));
  }

function sortFormatMeals(data) {
  data = data.sort((a, b) => (a.routeNumber > b.routeNumber) ? 1 : (a.routeNumber < b.routeNumber) ? -1 : (a.index >b.index) ? 1 : -1 )
  for (let i = 0; i < data.length; i++) {
    data[i].index = i
  }
  let meals = {}
  let prevRoute = null
  let routeData = []
  let routes = []
  for (let i = 0; i < data.length; i++) {
      let client = data[i]
      if (i > 0 && client.routeNumber != prevRoute) {
          if (prevRoute !== "-1") {
            meals[prevRoute] = routeData
            routes.push(prevRoute)
          }
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
