const express = require('express');
const router = express.Router();

const bcrypt = require('bcrypt');

const Volunteer = require('../models/volunteer')
const SiteManager = require('../models/siteManager')
const DataEntry = require('../models/dataEntry')

router.post('/email-taken', async (req, res) =>{
   const {email, user} = req.body
   let userType = getUser(user);
 
   userType.findOne({'email': email}).then(function(result) {
      if (!result) {
         console.log("Invalid email")
         res.status(404).send("Invalid email")
      }
      else {
         res.status(200).send("valid email")
      }
   });
});

router.post('/', async (req, res) => {
   const {email, user} = req.body
   
   let userType = getUser(user)
   if (userType == null) {
      res.status(404).send("Invalid user type") 
   }

   userType.findOne({'email': email}).then(function(result) {
      if (!result) {
         console.log("Invalid email")
            res.status(404).send("Invalid email")
      }
      else {
            console.log("login successful")
            if (user == "volunteer") {
               res.send(result)
            } 
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

module.exports = router;
