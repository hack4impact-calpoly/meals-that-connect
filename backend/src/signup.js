const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs')
require('dotenv').config()

const SiteManager = require('../models/siteManager');
const Volunteer = require('../models/volunteer');
const DataEntry = require('../models/dataEntry');

router.post('/email-taken', async (req, res) =>{
   const {email, user} = req.body
   let userType = getUser(user);
 
   userType.findOne({'email': email}).then(function(result) {
      if (result) {
         console.log("email already in use")
         res.status(404).send("email already in use")
      } 
      else {
         res.status(200).send("valid email")
      }
   });
});

router.post('/', async (req, res) =>{
    const {firstName, lastName, email, isAuthenticated, site, user, admin} = req.body
    const password = bcrypt.hashSync(req.body.password, 9);
 
    let userType = getUser(user);
    console.log(user)
    console.log(userType)
    if (userType == null) {
       res.status(404).send("Invalid user type") 
       return;
    }
  
    userType.findOne({'email': email}).then(function(result) {
       if (result) {
          console.log("email already in use")
          res.status(404).send("email already in use")
       } 
       else {
          var doc;
          if (user == "volunteer") {
             var volunteerID = getID();
             const {driver, kitchenStaff, isAuthenticated_driver, isAuthenticated_kitchenStaff, phoneNumber, availability} = req.body  
             doc = new userType({ volunteerID, firstName, lastName, email, password, driver, kitchenStaff, 
                     isAuthenticated_driver, isAuthenticated_kitchenStaff, site, phoneNumber, availability, admin: admin })
          } else {
             doc = new userType({ firstName, lastName, email, password, isAuthenticated, site, admin: admin })
          }
          doc.save()
          console.log("successfully added user")
          res.status(200).send("success")
       }
    }).catch(err => {
       console.log(err)
       res.send(500).send("Internal server error")
    })
 });

// Generates random string ID. Very low probability of duplicate IDs
function getID() {
   return '_' + Math.random().toString(36).substr(2, 9);
}
 
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
