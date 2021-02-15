const mongoose = require('mongoose')
const express = require('express');
const router = express.Router();

const Volunteer = require('../models/Volunteer')
const Hours = require("../models/Hours")

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
  totals = await getVolunteerHours(site)
  res.send(totals)
})


router.post('/updateVolunteerInfo', async (req, res) => {
  const { phoneNumber, email, days, notes } = req.body

  let user = await Volunteer.find({"email": email})
  console.log(user)

  console.log(days)


  Volunteer.findOne({"email": email}).then(function(err, volunteer) {
    if (err) {
      console.log(err)
      console.log("email not valid")
      res.status(404).send("email not valid")
    }
    else {
      updateVolunteer(email, phoneNumber, days, notes)
      //res.send("set!")
      res.status(200).send("success")
      console.log("success")
      console.log(volunteer)
    }
  })
  console.log("works!")
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

async function getVolunteerHours(site) {
    volunteerList = await getVolunteersBySite(site)
    totals = []
    for (var index in volunteerList) {
      first = volunteerList[index].firstName
      last = volunteerList[index].lastName
      VolunteerHours = await Hours.find({firstName: first, lastName: last}, function (err, hrs)
      {
        if (err)
        {
          console.log(err)}
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
      {$set: {phoneNumber: phoneNumber, availability: days, notes: notes, completedInfo: true}}
      )
      console.log("set")
}

module.exports = router;