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

module.exports = router;