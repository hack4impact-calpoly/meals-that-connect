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
   if (userType == null) {
      res.status(404).send("Invalid user type") 
   }

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
            if (user == "volunteer") {
               res.send(result)
            } 
            else {
               res.send(result)
            }
         } else {
            console.log("Invalid password")
               res.status(404).send("Invalid password")   
           }
     }
   })
});

// reset password
router.post('/reset-password', async(req, res) => {
   const {email, userType, password} = req.body

   userType.findOne({"email": email}).then(function(user) {
      if (!user) {
        console.log("email not valid")
        res.status(404).send("email not valid")
      }
      else {         
        updateUser(email, password, userType)
        res.status(200).send("success")
        console.log("success")
        //console.log(volunteer)
      }
   })
})

async function updateUser(email, password, userType) {
   await userType.updateOne(
       {email: email},
       {$set: { password: password }}
       )
       console.log("set");
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
