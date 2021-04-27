const mongoose = require('mongoose')
const express = require('express')
const router = express.Router()

const Orders = require("../models/orders")

// Takes in the given site and date (Monday of the week)
// and returns the meal totals (both frozen and regular) of the client's order

router.get('/mealTotals', async (req, res) => {
   const {site, date} = req.body
   Orders.find({site: site, startDate: date}, function (err, data) {
     if (err) {
       console.log(err)
      }
     else {
      let mealTotals = []
      for (let i = 0; i < data.length; i++) {
        mealTotals.push(getOrderTotals(data[i]))
      }  
      res.send({"meals": mealTotals})
     }
   })
 });

router.post('/', async (req, res) =>{
  const order = new Orders({
    site: req.body.site,
    startDate: req.body.startDate,
    orders: req.body.orders,
  });
  console.log(order);
  order.save()
  .then(data => {
    res.json(data);
  })
  .catch(err => {
    res.json({ message: err });
  });

});

function getOrderTotals(order) {
  var days = ["M", "T", "W", "Th", "F"]
  var frozenTotal = [0,0,0,0,0];
  var mealTotal = [0,0,0,0,0];
  for (var day in days) {
    if (order.orders[days[day]]) {
      frozenTotal[day] += order.orders[days[day]].frozen
      mealTotal[day] += order.orders[days[day]].regular
    }
  }
  
  var routeTotals = {"frozen": frozenTotal, "meals" : mealTotal}
  return routeTotals
}

module.exports = router;
