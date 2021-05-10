const mongoose = require('mongoose')
const express = require('express')
const router = express.Router()
var ObjectID = require('mongodb').ObjectID;

const Orders = require("../models/orders");
const Meals = require('../models/meals');

// Takes in the given site and startDate (Monday of the week)
// and returns the total (both frozen and regular meals) of all the routes of that day

router.post('/mealTotal', async (req, res) => {
  console.log("getting meal total")
   const {site, foodDay} = req.body
   Meals.find({site: site}, function (err, data) {
     if (err) {
       console.log(err)
      }
     else {
      let brownBag = 0;
      let frozen = 0;
      for (let i = 0; i < data.length; i++) { // look through each meal object
        let meal = data[i]
        if (meal.foodDays[foodDay] == true) // if ordered food for that day --> add 1
        {
          brownBag += 1
        }
        if (foodDay == meal.frozenDay)   // if req.date == frozenDay --> add frozenNumber
          frozen += meal.frozenNumber
      }
      res.send({"meals": brownBag, "frozen": frozen})
     }
   })
 });

 // adding/updating Order obj to the database

router.post('/', async (req, res) =>{
  const {site,date,frozen, whiteBag, brownBag} = req.body
  const datetemp = new Date(date)
  const compyear = datetemp.getFullYear()
  const compmonth = datetemp.getMonth() + 1
  const compdate = datetemp.getDate()
  console.log(compyear, compmonth, compdate)

  Orders.find({site: site},function (err, data) {
    if (err) {
      console.log(err)
    }
    if (data == undefined) { // new site
      var order = new Orders({
        site,date,frozen, whiteBag, brownBag
      });
      console.log(order);
      order.save()
      .then(data => {
        res.json(data);
      })
      .catch(err => {
        res.json({ message: err });
      });
    }

    else {
      //compare m/d/y of existing obj - if exist, replace
      for (let i = 0; i < data.length; i++)
      {
        let savedorder = data[i]
        if( (savedorder.date.getFullYear() == compyear) && (savedorder.date.getMonth()+1 == compmonth) && (savedorder.date.getDate() == compdate))
        {
          Orders.updateOne({_id: ObjectID(savedorder._id)}, { $set: {date: date, frozen: frozen, whiteBag: whiteBag, brownBag: brownBag}}, function(result) {
            console.log("Order updated");
            res.send("Order updated");
          })
          return
        }
      }
      //if for new day -> make new Order
      var order = new Orders({
        site,date,frozen, whiteBag, brownBag
      });
      console.log(order);
      order.save()
      .then(data => {
        res.json(data);
      })
      .catch(err => {
        res.json({ message: err });
      });
      
    }
  });

  
});


module.exports = router;
