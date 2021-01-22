const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const Volunteer = require('../models/volunteer')
const SiteManager = require('.././models/SiteManager')
const DataEntry = require('../models/DataEntry')

const getUserByEmail = async (schema, email) => {
   return await schema.findOne({
      email: email
      })
}


router.get('api/login', async (req, res) => {
   const email = req.body.email
   var schema = await checkSchema(req.body.accountType)

   user = await getUserByEmail(schema, email)
   
   bcrypt.compare(email, user.email, function (err, res) {
      if (res != true) {
         res.send("Incorrect email");
      }
      else {
        bcrypt.compare(req.body.password, user.password, function (err, res) {
           if (res == true) {
              res.send("login successful")
           } else{
              res.send("Incorrect password")
             }
           })
      }
   })
   res.json(accountEmail)
})

async function checkSchema(accountType) {
   var schema;
   if (accountType === "volunteer")
      schema = Volunteer;
   else if (accountType === "SiteManager")
      schema = SiteManager;
   else
      schema = DataEntry;

   return schema
}

module.exports = router;
