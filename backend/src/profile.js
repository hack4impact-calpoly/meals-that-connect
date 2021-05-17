const express = require('express');
const router = express.Router();

const SiteManager = require('../models/siteManager');
const Volunteer = require('../models/volunteer');
const DataEntry = require('../models/dataEntry');
const { request } = require('../server');

router.post('/', async (req, res) => {
    const {email, userType} = req.body
    
    let user = getUser(userType)
    if (user == null) {
       res.status(404).send("Invalid user type") 
    }
 
    user.findOne({'email': email}).then(function(result) {
       if (!result) {
          console.log("Invalid email")
             res.status(404).send("Invalid email")
       }
       else {
             console.log("profile found successfully")
             res.send(result)
      }
    })
 });
 
 function getUser(user) {
    if (user === "volunteer")
       return Volunteer
    else if (user === "site-manager")
       return SiteManager
    else if (user === "data-entry")
       return DataEntry
    else
       return null
 }

router.post('/update', async (req, res) => {
    const { firstName, lastName, userType, email } = req.body
    const { phoneNumber, availability, driver, kitchenStaff, notes } = req.body
    let user = getUser(userType)
    if (user == null) {
       res.status(404).send("Invalid user type") 
    }

    if (userType === "volunteer") {
        Volunteer.updateOne({'email': email}, {$set: {firstName: firstName, lastName: lastName, 
            phoneNumber: phoneNumber, availability: availability, driver: driver, 
            kitchenStaff: kitchenStaff, notes: notes }}).then(user => {
                res.status(200).send(user)
                console.log("successfully updates")
            })
    }
    else {
        user.updateOne({'email': email}, {$set: {firstName: firstName, lastName: lastName }}).then(() => {
            res.status(200).send("success")
            console.log("successfully updates")
        })
    }
})

module.exports = router;