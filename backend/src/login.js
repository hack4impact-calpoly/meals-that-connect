const express = require('express');
const router = express.Router();

const bcrypt = require('bcrypt');

const moment = require('moment')

const Volunteer = require('../models/Volunteer')
const SiteManager = require('../models/SiteManager')
const DataEntry = require('../models/DataEntry')
const Meal = require("../models/meals")
const Client = require("../models/clients");
const Meals = require('../models/meals');
const { now } = require('moment');

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
            if (user == "site-manager") { // checks if there is a meals database document 4 weeks ahead of the current login day
               Client.find({}, function(err, clients) {
                  if (err) {console.log(err)}
                  else {
                     for (i=0; i<clients.length; i++) { 
                        let latestWeek = 4;
                        var hasFourWeeks = false;
                        Meal.find({clientID: clients[i]._id}, function(err, meals) {
                           if (err) {console.log(err)}
                           else {
                              latestWeek = 4; //num of weeks between most recent meals document and the current date
                              hasFourWeeks = false;
                              for (i=0; i < meals.length; i++) {
                                 var current = moment();
                                 current = current.add(4, "weeks")
                                 var input = moment(meals[i].startDate)
                                 latestWeek = Math.min(latestWeek, weeksBetween(input.week(), current.week()))
                                 hasFourWeeks = (hasFourWeeks || (input.week() === current.week()))
                                 //meals[i].remove()
                              }
                              current = moment()
                              current = current.add(4, "weeks")
                              if (!hasFourWeeks) {
                                 for (j=0; j<latestWeek; j++) {
                                    console.log("here")
                                    newMeal = new Meal({
                                    firstName: clients[i].firstName,
                                    lastName: clients[i].lastName,
                                    clientID: meals[0].clientID,
                                    site: meals[0].site,
                                    routeNumber: meals[0].routeNumber,
                                    startDate: current,
                                    mealNumber: meals[0].mealNumber,
                                    foodDays: meals[0].foodDays,
                                    frozenNumber: meals[0].frozenNumber,
                                    frozenDay: meals[0].frozenDay,
                                    index: meals[0].index
                                    })
                                    newMeal.save()
                                    current = current.subtract(1, "week")
                                 }
                              }
                           }
                        })
                        // current = moment()
                        // newMeal = new Meal({
                        //    firstName: clients[i].firstName,
                        //    lastName: clients[i].lastName,
                        //    clientID: clients[i]._id,
                        //    site: clients[i].site,
                        //    routeNumber: clients[i].routeNumber,
                        //    startDate: current,
                        //    mealNumber: clients[i].mealNumber,
                        //    foodDays: clients[i].foodDays,
                        //    frozenNumber: clients[i].frozenNumber,
                        //    frozenDay: clients[i].frozenDay,
                        //    index: clients[i].index
                        //    })
                        //    newMeal.save()                    
                     }
                  }
               })
            }
               res.send(result);
         }
         else {
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

function weeksBetween(w1, w2) {
   var diff = Math.min(Math.abs(w1 - w2), Math.abs(w1 - w2 + 52), Math.abs(w1 - w2 - 52))
   return diff
}

module.exports = router;
