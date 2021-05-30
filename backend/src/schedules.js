const express = require('express');
const router = express.Router();
const moment = require('moment');

const Schedule = require('../models/schedule')
const Client = require("../models/clients")
const {decodeToken} = require("./token.js")

/*
  Contains methods:
    get: Fetch the schedule for the provided site and date
    update: Update the schedule for the provided site and date
*/

router.post('/update', async (req, res) => {
    let {token, startDate, routes, mealPrep, mealPrep2, mealPrep3, mealPrep4, mealPrep5, staff, computer} = req.body
    startDate = moment(startDate).format('YYYY-MM-DD');
    
    let userData = decodeToken(token)
    if (userData == null) {
        res.status(403).send("Unauthorized user")
        return
    }
    let site = userData.site

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
    let {token, site, startDate, prevData} = req.body
    startDate = moment(startDate).format('YYYY-MM-DD');

    let userData = decodeToken(token)
    if (userData == null) {
        res.status(403).send("Unauthorized user")
        return
    }

    Schedule.findOne({'site': site, 'startDate': startDate}).then(async function(result) {
        if (result) {
            existing_routes = result.routes
            schedule_routes = {}
            let route_names = await getRoutes(site)
            route_names.forEach(route => {
                if (!(route in existing_routes)){
                    updated = true
                    schedule_routes[route] = [ [""], [""], [""], [""], [""] ]
                }
                else {
                    schedule_routes[route] = existing_routes[route]
                }
            })  
            result.routes = schedule_routes
            Schedule.updateOne({'_id': result._id}, {'routes': schedule_routes}).then(function(schedule) {
                if (!schedule) {
                    res.send("Error in updating schedule");
                } else {
                    console.log("Returning schedule")
                    res.status(200).send(result) 
                }
            })
        }
        else {
            initializeEmptySchedule(site).then((emptySchedule) => {
                const EMPTY_SCHEDULE = emptySchedule
                prevData = (prevData !== null) ? prevData : EMPTY_SCHEDULE
                let routes = {}
                routes = prevData["routes"]
                mealPrep = prevData["mealPrep"] 
                mealPrep2 = prevData["mealPrep2"]
                mealPrep3 = prevData["mealPrep3"] 
                mealPrep4 = prevData["mealPrep4"]
                mealPrep5 = prevData["mealPrep5"] 
                staff = prevData["staff"]
                computer = prevData["computer"]
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
    let routes
    await Client.find({site: site}).then(clients => {
        let data = {}
        if (clients.length > 0) {
            for (let i = 0; i < clients.length; i++) {
                let route = clients[i].routeNumber
                if (route != -1) {
                    data[route] = route
                }
            }
        }
        routes = data
    })
    return Object.keys(routes)
}

async function initializeEmptySchedule(site) {
    let route_names = await getRoutes(site)
    let routes = {}
    route_names.forEach(route => {
        let data = [ [""], [""], [""], [""], [""] ]
        routes[route] = data
    })
    let emptySchedule = {
        routes: routes,
        mealPrep: [ [""], [""], [""], [""], [""] ],
        mealPrep2: [ [""], [""], [""], [""], [""] ],
        mealPrep3: [ [""], [""], [""], [""], [""] ],
        mealPrep4: [ [""], [""], [""], [""], [""] ],
        mealPrep5: [ [""], [""], [""], [""], [""] ],
        staff: [ [""], [""], [""], [""], [""] ],
        computer: [ [""], [""], [""], [""], [""] ]
    }
    return emptySchedule
}

module.exports = router;