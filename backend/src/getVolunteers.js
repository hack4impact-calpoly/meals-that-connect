const mongoose = require('mongoose')
const express = require('express');
const router = express.Router();

const bcrypt = require('bcrypt')
const Volunteer = require('../models/Volunteer')
const Hours = require("../models/Hours")

router.post('/addVolunteer', async (req, res) => {
  const {firstName, lastName, email, password, driver, kitchenStaff, isAuthenticated_driver, isAuthenticated_kitchenStaff, site, phoneNumber, availability, notes, digitalSystem, completedOrientation} = req.body  
  var volunteerID = getID();
  Volunteer.findOne({'email': email}).then(function(result) {
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

router.post('/volunteerSite', async (req, res) => {
  const {site} = req.body
  Volunteer.find({site: site}, function (err, volunteer) {
    if (err) {
      console.log(err)
    }
    else {
      res.send(volunteer)
    }
  })
})

router.post('/availability', async (req, res) => {
  const {site} = req.body
  Volunteer.find({site: site}, function (err, volunteers) {
    let daily_availability = {
      M: [],
      T: [],
      W: [],
      Th: [],
      F: []
    }
    console.log(daily_availability)
    let days = [ 'M', 'T', 'W', 'Th', 'F' ]

    volunteers.forEach(volunteer => {
      let availability = volunteer.availability
      for (let day of days) {
        if (availability[day]) {
          daily_availability[day].push(volunteer.firstName = " " + volunteer.lastName)
        }
      }
    })
    console.log(daily_availability)
    if (err) {
      console.log(err)
    }
    else {
      res.send(daily_availability)
    }
  })
})

router.get('/allVolunteers', async (req, res) => {
  Volunteer.find({}, function (err, volunteer) {
    if (err) {
      console.log(err)
    }
    else {
      res.send(volunteer)
    }
  })
})

router.post('/siteVolunHours', async (req, res) => {
  const {site} = req.body
  var totals = await getVolunteerHours(site)
  res.send(totals)
})


router.post('/updateVolunteerInfo', async (req, res) => {
  const { phoneNumber, email, days, notes } = req.body

  //let user = await Volunteer.findOne({"email": email})

  Volunteer.findOne({"email": email}).then(function(volunteer) {
    if (!volunteer) {
      console.log("email not valid")
      res.status(404).send("email not valid")
    }
    else {
      updateVolunteer(email, phoneNumber, days, notes)
      res.status(200).send("success")
      console.log("success")
      //console.log(volunteer)
    }
  })
})


router.post('/volunteerComplete', async(req, res) => {
  const { email } = req.body
  
  Volunteer.findOne({"email": email}).then(function(volunteer) {
    if (!volunteer) {
      //console.log(volunteer)
      res.status(404).send("email not valid")
    }
    else {
      if (volunteer.phoneNumber !== "0") {
        res.status(200).send("Info completed")
        console.log("Info completed")
      }
      else {
        res.status(300).send("not completedInfo")
        console.log("not completedInfo")
      }
    }
  })
})

router.post('/volunteerDelete', async(req, res) => {
  const { email } = req.body

  Volunteer.deleteOne({"email": email})
    .then(function(volunteer) {
      if (!volunteer) {
        console.log(volunteer)
        res.status(404).send("email not valid")
      }
      else {
        if (volunteer.phoneNumber !== "0") {
          res.status(200).send("Info completed")
          console.log("Info completed")
        }
        else {
          res.status(404).send("not completedInfo")
          console.log("not completedInfo")
        }
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

//rewrite this funcion
async function getVolunteerHours(site) {
    var volunteerList = await getVolunteersBySite(site)
    var totals = []
    for (var index in volunteerList) {
      var first = volunteerList[index].firstName
      var last = volunteerList[index].lastName
      await Hours.find({firstName: first, lastName: last}, function (err, hrs)
      {
        if (err)
        {
          console.log(err)
        }
        else
        {
          totals.push({firstName: first, lastName: last, hours: hrs})
        }
      })
    }
    return totals
}

async function updateVolunteer(email, phoneNumber, days, notes) {
  await Volunteer.updateOne(
      {email: email},
      {$set: {phoneNumber: phoneNumber, availability: days, notes: notes }}
      )
      console.log("set")
}

// Generates random string ID. Very low probability of duplicate IDs
function getID() {
  return '_' + Math.random().toString(36).substr(2, 9);
}

module.exports = router;
