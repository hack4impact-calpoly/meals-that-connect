const express = require('express');
const router = express.Router();

const SiteManager = require('../models/siteManager');
const Volunteer = require('../models/volunteer');
const DataEntry = require('../models/dataEntry');
const decodeToken = require("./token.js")
var jwt = require('jsonwebtoken');

/*
  Contains methods:
    : Fetch the current user's data
    update: Update the current user's data
*/

router.post('/', async (req, res) => {
    const {token} = req.body

    let userData = decodeToken(token)
    if (userData == null) {
        res.status(403).send("Unauthorized user")
        return
    }
    let email = userData.email
    let userType = userData.user
    
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

router.post('/update', async (req, res) => {
    const { firstName, lastName, token, newUser, newSite } = req.body
    const { phoneNumber, availability, driver, kitchenStaff, notes } = req.body

    let userData = decodeToken(token)
    if (userData == null) {
        res.status(403).send("Unauthorized user")
        return
    }
    let email = userData.email
    let userType = userData.user
    let site = userData.site

    let user = getUser(userType)
    if (user == null) {
       res.status(404).send("Invalid user type") 
    }

    console.log(req.body)

    if (userType === "volunteer") {
        Volunteer.updateOne({'email': email}, {$set: {firstName: firstName, lastName: lastName, 
            phoneNumber: phoneNumber, availability: availability, driver: driver, 
            kitchenStaff: kitchenStaff, notes: notes }}).then(user => {

                var new_token = jwt.sign(
                    {  
                       email: email, 
                       user: newUser,
                       site: newSite,
                       volunteerID: user.volunteerID
                    },
                    process.env.TOKEN_SECRET,
                    { expiresIn: "24h" }
                 );
            
                res.status(200).send({user, new_token})
                console.log("successfully updates")
            })
    }
    else {
        user.updateOne({'email': email}, {$set: {firstName: firstName, lastName: lastName, site: newSite }}).then((data) => {
            var new_token = jwt.sign(
                {  
                   email: email, 
                   user: newUser,
                   site: newSite
                },
                process.env.TOKEN_SECRET,
                { expiresIn: "24h" }
             );
        
            res.status(200).send({data, new_token})
            console.log("successfully updates")
        })
    }
})

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

module.exports = router;