const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const DataEntry = require('.././models/DataEntry')

const createDataEntryAccount = async (firstName, lastName, email, password, isAuthenticated, site) => {
   return new DataEntry({
      firstName,
      lastName,
      email,
      password,
      isAuthenticated,
      site
   }).save()
}

router.post('/api/DataEntry', async (req, res) => {
   const firstName = req.body.firstName
   const lastName = req.body.lastName
   
   isEmailUsed(req.body.email).then(function(valid) {
      if (valid) {
         const email =  req.body.email
      } else {
         res.send("Email is already in use");
      }
   })

   let encryptPassword = bycript.hashSync(req.body.password, 9);
   const password = encryptPassword

   const isAuthenticated = req.body.isAuthenticated
   const site = req.body.site
})

function isEmailUsed(email) {
   return DataEntry.findOne({email: email}).then(function(result){
      return result !== null;
   });
}

module.exports = router;
