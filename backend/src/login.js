const express = require('express');
const router = express.Router();

const bcrypt = require('bcrypt');

const Volunteer = require('../models/Volunteer')
const SiteManager = require('../models/SiteManager')
const DataEntry = require('../models/DataEntry')

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
   const {email, password, user} = req.body
   let userType = getUser(user)

   userType.findOne({'email': email}).then(function(result) {
      if (!result) {
         console.log("Invalid email")
            res.status(404).send("Invalid email")
      }
      else {
         let userPassword = result.password
         const valid = bcrypt.compareSync(password, userPassword);
         if (valid) {
            console.log("login successful")
            res.send("login successful")
         } else {
            console.log("Invalid password")
               res.status(404).send("Invalid password")   
           }
     }
   })
});

function getUser(user) {
   if (user === "volunteer")
      return Volunteer
   else if (user === "site-manager")
      return SiteManager
   else
      return DataEntry
}

module.exports = router;
