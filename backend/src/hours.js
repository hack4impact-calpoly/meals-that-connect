const mongoose = require('mongoose')
const express = require('express');
const router = express.Router();

const Volunteer = require('../models/volunteer');
const Hours = require("../models/hours")
const decodeToken = require("./token.js")

/*
  Contains methods:
    totals: returns the hour totals for all volunteers at a site for a given week
    edit-site-manager: edits the hours worked for a volunteer for a provided date
    edit: Update the hours worked for a volunteer for a given hour log ID
    delete: Deletes an hour log provided an hour log ID
    all: Returns all the hours logged for the provided volunteer 
    add: Adds a new hour log entry for a given volunteer
*/
  
router.post('/edit', async (req, res) => {
    const {logID, key, value, token} = req.body

    let userData = decodeToken(token)
    if (userData == null) {
        res.status(403).send("Unauthorized user")
        return
    }

    Hours.find({_id: logID}, function (err, hourLog) {
        if (err) {
            console.log(err)
        }
        else {
            hourLog[0][key] = value
            hourLog[0].save()
            res.send(`Successfully updated hour log `)
        }
    })
})

router.post('/edit-site-manager', async (req, res) => {
    const { date, value, token } = req.body

    let userData = decodeToken(token)
    if (userData == null) {
        res.status(403).send("Unauthorized user")
        return
    }
    let { site, volunteerID } = userData

    Hours.findOne({volunteerID, date, site}, function (err, result) {
        if (result) {
            Hours.updateOne({'_id': result._id}, {home: value}).then(function(hourLog) {
                if (!hourLog) {
                    console.log("Error in updating hourLog")
                    res.send("Error in updating hourLog");
                } else {
                    console.log("hourLog updated")
                    res.status(200).send(result) 
                }
            })
        }
        else {
            var newHour = Hours({site, volunteerID, date, home: value, dinner: 0})
            newHour.save()
            console.log("Hour log successfully created")
            res.status(200).send(newHour)
        }
    })
})



router.post('/add', async (req, res) => {
    const { date, hours, token } = req.body

    let userData = decodeToken(token)
    if (userData == null) {
        res.status(403).send("Unauthorized user")
        return
    }
    let { site, volunteerID } = userData

    Volunteer.findOne({'volunteerID': volunteerID}).then(function(result) {
        if (!result) {
            console.log('not a volunteer')
        }
        else {
            var temp = new Hours({volunteerID, date, 'home': hours, site})
            temp.save()
            console.log('successfully added hours')
        }
    }).catch(err => {
        console.log(err)
        res.send(500).send("Internal server error")
    })
})

router.post('/delete', async (req, res) => {
    const {_id, token} = req.body

    let userData = decodeToken(token)
    if (userData == null) {
        res.status(403).send("Unauthorized user")
        return
    }

    Hours.deleteOne({_id: _id}, function (err, deleted) {
        if (err) {
            console.log(err)
        }
        else {
            res.send(`Successfully deleted hour log`)
        }
    })
})

router.post('/all', async (req, res) => {
    const {token} = req.body

    let userData = decodeToken(token)
    if (userData == null) {
        res.status(403).send("Unauthorized user")
        return
    }
    let volunteerID = userData.volunteerID

    Hours.find({volunteerID: volunteerID}, function (err, hours) {
      if (err) {
        console.log(err)
        res.send(err)
      }
      else {
        hours = hours.sort((a, b) => (a.date < b.date) ? 1 : -1 )
        res.send(hours)
        console.log(hours)
      }
    })
  })
  
  router.post('/totals', async (req, res) => {
    const {token, week} = req.body

    let userData = decodeToken(token)
    if (userData == null) {
        res.status(403).send("Unauthorized user")
        return
    }
    let site = userData.site
  
    await Hours.find({ site: site,  date: {
        $gte: new Date(week[1]),
        $lte: new Date(week[5])
      }}, async function (err, data) {
  
        if (err) {
          console.log(err)
        }	
        else {
          let totals = await getVolunteerHours(data, site, week)
          res.send(totals)
        }
    })
  })

async function getVolunteersBySite(siteName) {
    return await Volunteer.find({site: siteName}, function (err, volunteers) {
        if (err) {
            console.log(err)
        }
        else {
            return volunteers
        }
    })
}
  
async function getVolunteerHours(hours, site, week) {
    var volunteers = await getVolunteersBySite(site)
    var volunteerHours = {}
    volunteers.forEach(volunteer => {
        let { volunteerID, firstName, lastName } = volunteer
        volunteerHours[volunteerID] = {firstName: firstName, lastName: lastName, volunteerID: volunteerID, M: 0, T: 0, W: 0,Th: 0, F: 0 }
    })
    hours.forEach(hourLog => {
        let day = getDay(week, hourLog.date)
        volunteerHours[hourLog.volunteerID][day] = hourLog.home
    })
    return Object.values(volunteerHours)
}
  
function getDay(weekArr, date) {
    let dayArr = ["M", "T", "W", "Th", "F"]
    for(let i = 0; i < weekArr.length; i++) {
        let weekDate = new Date(weekArr[i]).toDateString()
        let compDate = new Date(date).toDateString()
        if (weekDate == compDate) {
            return dayArr[i-1]
        }
    }
}

module.exports = router;
