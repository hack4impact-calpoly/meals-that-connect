const mongoose = require('mongoose')
const express = require('express');
const router = express.Router();
const moment = require('moment');

const Schedule = require('../models/schedule')
const Volunteer = require('../models/volunteer')
const Hours = require("../models/hours")
const Client = require("../models/clients")

router.post('/update', async (req, res) => {
    let {site, startDate, routes, mealPrep, mealPrep2, mealPrep3, mealPrep4, mealPrep5, staff, computer} = req.body
    //console.log("update backend")
    startDate = moment(startDate).format('YYYY-MM-DD');
    
    Schedule.updateOne({'site': site, 'startDate': startDate}, {site, startDate, routes, mealPrep, mealPrep2, mealPrep3, mealPrep4, mealPrep5, staff, computer}).then(function(schedule) {
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
    let {site, startDate, prevData} = req.body
    console.log(startDate)
    startDate = moment(startDate).format('YYYY-MM-DD');
    Schedule.findOne({'site': site, 'startDate': startDate}).then(async function(result) {
        if (result) {
            existing_routes = result.routes
            getRoutes(site).then((route_names) => {
                let updated = false
                route_names.forEach(route => {
                    if (!(route in existing_routes)){
                        updated = true
                        existing_routes[route] = [ [""], [""], [""], [""], [""] ]
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
                routes = prevData["routes"]
                let prevDataMealPrep = prevData["mealPrep"]      
                let prevDataMealPrep2 = prevData["mealPrep2"]
                let prevDataMealPrep3 = prevData["mealPrep3"]      
                let prevDataMealPrep4 = prevData["mealPrep4"]
                let prevDataMealPrep5 = prevData["mealPrep5"]      
                let prevDataStaff = prevData["staff"]
                let prevDataComputer = prevData["computer"]
                mealPrep = [  [prevDataMealPrep[0]], [prevDataMealPrep[1]], [prevDataMealPrep[2]], [prevDataMealPrep[3]], [prevDataMealPrep[4]]]
                mealPrep2 = [ [prevDataMealPrep2[0]], [prevDataMealPrep2[1]], [prevDataMealPrep2[2]], [prevDataMealPrep2[3]], [prevDataMealPrep2[4]]]
                mealPrep3 = [ [prevDataMealPrep3[0]], [prevDataMealPrep3[1]], [prevDataMealPrep3[2]], [prevDataMealPrep3[3]], [prevDataMealPrep3[4]] ]
                mealPrep4 = [ [prevDataMealPrep4[0]], [prevDataMealPrep4[1]], [prevDataMealPrep4[2]], [prevDataMealPrep4[3]], [prevDataMealPrep4[4]] ]
                mealPrep5 = [ [prevDataMealPrep5[0]], [prevDataMealPrep5[1]], [prevDataMealPrep5[2]], [prevDataMealPrep5[3]], [prevDataMealPrep5[4]] ]
                staff = [ [prevDataStaff[0]], [prevDataStaff[1]], [prevDataStaff[2]], [prevDataStaff[3]], [prevDataStaff[4]] ]
                computer = [ [prevDataComputer[0]], [prevDataComputer[1]], [prevDataComputer[2]], [prevDataComputer[3]], [prevDataComputer[4]] ]
                var new_schedule = Schedule({site, startDate, routes, mealPrep, mealPrep2, mealPrep3, mealPrep4, mealPrep5, staff, computer})
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