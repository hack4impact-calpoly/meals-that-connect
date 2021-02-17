const express = require('express');
const router = express.Router();

const Volunteer = require("../models/Volunteer")
const Hours = require("../models/Hours")

// Takes in a volunteer's email and the corresponding category that is being
// updated and updates the database
router.post('/OverviewTable', async (req, res) => {
   const {email, key, data} = req.body

   var query = {}
   query[key] = data

   Volunteer.updateOne({'email': email}, query).then(function(result) {
      if (!result) {
         console.log("Error in updating info")
         res.send("Error in updating info")
      } else {
         console.log("Information updated")
         res.send("Information updated")
        }
      
   })
});

// Takes in first and last name to find the correct volunteer in the
// database and updates their hours
router.post('/Hours', async (req, res) => {
   const {firstName, lastName, key, data} = req.body

   var query = {}
   query[key] = data

   Hours.updateOne({'firstName': firstName, 'lastName': lastName}, query).then(function(result) {
      if (!result) {
         console.log("Error in updating hours/data info")
         res.send("Error in updating hours/data info")
      } else {
         console.log("Information updated")
         res.send("Information updated")
        }
   })
 });

module.exports = router;
