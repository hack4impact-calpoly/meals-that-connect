const mongoose = require('mongoose')
const express = require('express')
const router = express.Router()

const Meal = require("../models/meals")
const Client = require("../models/clients")

// Takes in the given data (Monday of the week) and
// the client and posts/updates the entry in the database
// to the correct data and preferences of the client.

router.post('/schedule', async (req, res) => {
   const {date, volunteer} = req.body
   
   var meal;

   meal = new Meal({'volunteerID': volunteer.volunteerID, 'site': volunteer.site,
                   'routeNumber': volunteer.routeNumber, 'startDate': date,
                   'mealNumber': volunteer.mealNumber, 'foodDays': volunteer.foodDays, 
                   'frozenNumber': volunteer.frozenNumber, 'frozenDay': volunteer.frozenDay})
 
   meal.save();
   console.log("meal successfully added");
   res.send("meal successfully added");

});

module.exports = router;
