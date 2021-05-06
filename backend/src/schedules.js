const mongoose = require('mongoose')
const express = require('express');
const router = express.Router();

const Schedule = require('../models/schedule')
const Volunteer = require('../models/volunteer')
const Hours = require("../models/hours")
const Client = require("../models/clients")

router.post('/update', async (req, res) => {
    let {site, startDate, routes, mealPrep, staff, computer} = req.body
    Schedule.updateOne({'site': site, 'startDate': startDate}, {site, startDate, routes, mealPrep, staff, computer}).then(function(schedule) {
        if (!schedule) {
            res.status(404).send("Error in updating schedule");
        } else {
            console.log("schedule updated")
            res.status(200).send("schedule updated") 
        }
    }).catch(err => {
        console.log(err)
        res.send(500).send("Error updating schedule")
    })
})


router.post('/get', async (req, res) => {
    let {site, startDate} = req.body
    Schedule.findOne({'site': site, 'startDate': startDate}).then(async function(result) {
        if (result) {
            existing_routes = result.routes
            getRoutes(site).then((route_names) => {
                let updated = false
                route_names.forEach(route => {
                    if (!(route in existing_routes)){
                        updated = true
                        existing_routes[route] = [ [], [], [], [], [] ]
                    }
                })  
                if (updated) {
                    Schedule.updateOne({'_id': result._id}, {'routes': existing_routes}).then(function(schedule) {
                        if (!schedule) {
                            res.send("Error in updating schedule");
                        } else {
                            console.log("schedule updated")
                            res.status(200).send(result) 
                        }
                    })
                }   
                else {
                    res.status(200).send(result) 
                    console.log("schedule up to date")
                }
            })   
        }
        else {
            getRoutes(site).then((route_names) => {
                let routes = {}
                route_names.forEach(route => {
                    let data = [ [], [], [], [], [] ]
                    routes[route] = data
                })       
                mealPrep = [ [], [], [], [], [] ]
                staff = [ [], [], [], [], [] ]
                computer = [ [], [], [], [], [] ]
                var new_schedule = Schedule({site, startDate, routes, mealPrep, staff, computer})
                new_schedule.save()
                console.log("Schedule successfully created")
                res.status(200).send(new_schedule)
            })
        }
    }).catch(err => {
        console.log(err)
        res.send(500).send("Error adding schedule")
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

module.exports = router;
