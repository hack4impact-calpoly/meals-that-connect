const mongoose = require('mongoose')
const express = require('express');
const router = express.Router();

const Schedule = require('../models/Schedule')
const Volunteer = require('../models/Volunteer')
const Hours = require("../models/Hours")
const Client = require("../models/clients")

// router.post('/add', async (req, res) => {
//   const {firstName, lastName, email, password, driver, kitchenStaff, isAuthenticated_driver, isAuthenticated_kitchenStaff, site, phoneNumber, availability, notes, digitalSystem, completedOrientation} = req.body  
//   var volunteerID = getID();
//   Volunteer.findOne({'email': email}).then(function(result) {
//   if (result) {
//     console.log("email already in use")
//      res.sstatus(404).send("email already in use")     
//   }
//   var volun = new Volunteer({volunteerID, firstName, lastName, email, password, driver, kitchenStaff, isAuthenticated_driver, isAuthenticated_kitchenStaff, site, phoneNumber, availability, notes, digitalSystem, completedOrientation})
//   volun.save()
//   console.log("succcessfully added volunteer")
//   res.status(200).send("success")
//   }).catch(err => {
//     console.log(err)
//     res.send(500).send("Internal server error")
//   })
// })

router.post('/new', async (req, res) => {
    const {site, startDate} = req.body
    console.log(new Date())
    Schedule.findOne({'site': site, 'startDate': startDate}).then(function(result) {
    if (result) {
      console.log("email already in use")
       res.sstatus(404).send("email already in use")     
    }
    var volun = new Volunteer({volunteerID, firstName, lastName, email, password, driver, kitchenStaff, isAuthenticated_driver, isAuthenticated_kitchenStaff, site, phoneNumber, availability, notes, digitalSystem, completedOrientation})
    volun.save()
    console.log("succcessfully added volunteer")
    res.status(200).send("success")
    }).catch(err => {
      console.log(err)
      res.send(500).send("Internal server error")
    })
  })

async function getRoutes(site) {
    let routes = {}
    await Client.find({site: site}, function (err, clients) {
        if (err) {
            console.log(err)
        }
        else {
            clients.forEach(client => {
                let route = client.routeNumber
                if (route != -1 && !routes.hasOwnProperty(route)) {
                    routes[route] = route
                }
            })
        }
    })
    return Object.keys(routes)
}

router.post('/get', async (req, res) => {
  const {site, startDate} = req.body
  Schedule.find({site: site, startDate: startDate}, function (err, schedule) {
    if (err) {
        console.log("Error fetching schedule")
        res.send(500).send("Internal server error")
    }
    else {
        console.log(schedule)
        res.status(200).send(schedule)
    }
  })
})

// router.get('/update', async (req, res) => {
//   Volunteer.find({}, function (err, volunteer) {
//     if (err) {
//       console.log(err)
//     }
//     else {
//       res.send(volunteer)
//     }
//   })
// })

module.exports = router;
