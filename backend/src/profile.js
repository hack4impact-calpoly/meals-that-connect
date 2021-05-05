const express = require('express');
const router = express.Router();

const SiteManager = require('../models/siteManager');
const Volunteer = require('../models/volunteer');
const DataEntry = require('../models/dataEntry');

router.get('/SiteManager', async (req, res) => {
    const {email, site} = req.body
    SiteManager.find({email: email, site: site}, function (err, volunteer) {
      if (err) {
        console.log(err)
      }
      else {
        res.send(volunteer)
      }
    })
})

router.post('/updateSiteManagerProfile', async (req, res) => {
    const { firstName, lastName, email, site } = req.body

    let user = await SiteManager.findOne({"email": email})

    SiteManager.findOne({"email": email}).then(function(siteManager) {
        if (!siteManager) {
        console.log("email not valid")
        res.status(404).send("email not valid")
        }
        else {
        updateSiteManagerProfile(firstName, lastName, email, site)
        res.status(200).send("success")
        console.log("success")
        }
    })
})

router.get('/volunteer', async (req, res) => {
    const {email, site} = req.body
    Volunteer.find({email: email, site: site}, function (err, volunteer) {
      if (err) {
        console.log(err)
      }
      else {
        res.send(volunteer)
      }
    })
})

router.post('/updateVolunteerProfile', async (req, res) => {
    const { firstName, lastName, email, site, phoneNumber, availability } = req.body

    let user = await Volunteer.findOne({"email": email})

    Volunteer.findOne({"email": email}).then(function(volunteer) {
        if (!volunteer) {
        console.log("email not valid")
        res.status(404).send("email not valid")
        }
        else {
        updateVolunteerProfile(firstName, lastName, email, site, phoneNumber, availability)
        res.status(200).send("success")
        console.log("success")
        }
    })
})

router.get('/dataEntry', async (req, res) => {
    const {email, site} = req.body
    DataEntry.find({email: email, site: site}, function (err, volunteer) {
      if (err) {
        console.log(err)
      }
      else {
        res.send(volunteer)
      }
    })
})

router.post('/updateDataEntryProfile', async (req, res) => {
    const { firstName, lastName, email, site } = req.body

    let user = await DataEntry.findOne({"email": email})

    DataEntry.findOne({"email": email}).then(function(dataEntry) {
        if (!dataEntry) {
        console.log("email not valid")
        res.status(404).send("email not valid")
        }
        else {
        updateDataEntryProfile(firstName, lastName, email, site)
        res.status(200).send("success")
        console.log("success")
        }
    })
})

async function updateSiteManagerProfile(firstName, lastName, email, site) {
    await SiteManager.updateOne(
        {email: email},
        {$set: {firstName: firstName, lastName: lastName, site: site }}
        )
        console.log("set")
}

async function updateVolunteerProfile(firstName, lastName, email, site, phoneNumber, availability) {
    await Volunteer.updateOne(
        {email: email},
        {$set: {firstName: firstName, lastName: lastName, site: site, phoneNumber: phoneNumber, availability: availability }}
        )
        console.log("set")
}

async function updateDataEntryProfile(firstName, lastName, email, site) {
    await DataEntry.updateOne(
        {email: email},
        {$set: {firstName: firstName, lastName: lastName, site: site }}
        )
        console.log("set")
}

module.exports = router;