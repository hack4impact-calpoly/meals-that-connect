const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const Volunteer = require('.././models/volunteer')

const createVolunteerAccount = async (firstName, lastName, email, password, driver, kitchenStaff, isAuthenticated_driver, isAuthenticated_kitckenStaff, site) => {
   return new Volunteer({
      fistName,
      lastName,
      email,
      password,
      driver,
      kitchenStaff,
      isAuthenticated_driver,
      isAuthenticated_kitchenStaff,
      site
   }).save()
}

router.post('/api/Volunteer', async (req, res) => {
   const firstName = req.body.firstName
   const lastName = req.body.lastName

   isEmailUsed(req.body.email).then(function(valid) {
      if (valid) {
         const email = req.body.email
      } else {
         res.send("Email is already in use");
      }
   })

   let encryptPassword = bcrypt.hashSync(req.body.password, 9)
   const password = encryptPassword

   const driver = req.body.driver
   const kitchenStaff = req.body.driver
   const isAuthenticated_driver = req.body.isAuthenticated_driver
   const isAuthenticated_kitchenStaff = req.body.isAuthenticated_kitchenstaff
   const site = req.body.site
})

function isEmailUsed(email) {
  return Volunteer.findOne({email: email}).then(function(result){
      return result!== null;
      });
}

module.exports = router;
