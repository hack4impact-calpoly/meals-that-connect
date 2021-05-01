const mongoose = require('mongoose')
const express = require('express')
const router = express.Router()

const Meal = require("../models/meals")
const Client = require("../models/clients")

// Takes in the given data (Monday of the week) and
// the client and posts/updates the entry in the database
// to the correct data and preferences of the client.

router.post('/', async (req, res) => {
   const {date, client} = req.body
   
   var meal;

   meal = new Meal({'clientID': client._id, 'site': client.site,
                   'routeNumber': client.routeNumber, 'startDate': date,
                   'mealNumber': client.mealNumber, 'foodDays': client.foodDays, 
                   'frozenNumber': client.frozenNumber, 'frozenDay': client.frozenDay})
   meal.save();
   console.log("meal successfully added");
   res.send("meal successfully added");

});

module.exports = router;
