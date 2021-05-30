const express = require('express');
// var jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs')
const router = express.Router();
// require('dotenv').config()
const {createToken} = require("./token.js")

const Volunteer = require('../models/volunteer')
const SiteManager = require('../models/siteManager')
const DataEntry = require('../models/dataEntry')

router.post('/email-taken', async (req, res) =>{
   res.header('Access-Control-Allow-Origin', '*');
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
   res.header('Access-Control-Allow-Origin', '*');
   // console.log(req.body)
   const {email, user, password} = req.body
   
   let userType = getUser(user)
   if (userType == null) {
      res.status(404).send("Invalid user type") 
   }

   userType.findOne({'email': email}).then(function(result) {
      if (!result) {
         console.log("Invalid email")
         res.status(404).send("Invalid email or password")
      }
      else {
         const correctPwd = bcrypt.compareSync(password, result.password);
         if (!correctPwd) {
            res.status(404).send("Invalid email or password")
         }
         else {
            console.log("login successful")
            let { site, volunteerID } = result
            let data = {  
               email: email, 
               user: user,
               site: site,
               volunteerID: volunteerID
            }
            let token = createToken(data)
            result['token'] = token
            res.send({result, token})
         }
      }
   })
});


// reset password
router.post('/reset-password', async(req, res) => {
   res.header('Access-Control-Allow-Origin', '*');
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
