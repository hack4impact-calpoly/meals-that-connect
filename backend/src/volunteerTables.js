const express = require('express');
const router = express.Router();

const Volunteer = require("../models/Volunteer")
const Hours = require("../models/hours")

router.post('/', async (req, res) => {
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

router.post('/', async (req, res) => {
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
