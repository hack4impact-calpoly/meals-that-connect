const mongoose = require('mongoose')
const express = require('express')
const router = express.Router()
const Orders = require("../models/orders");
const {decodeToken} = require("./token.js")

/*
  Contains methods:
    totals: Calculate the order totals for M-F provided a site a startDate
    : Add or update an Order object to the database given a site, date, and order details
*/

// Calculate the order totals for M-F provided a site a startDate
router.post('/totals', async (req, res) => {
  	console.log("getting order totals")
  	const {token, weekArr} = req.body

	let userData = decodeToken(token)
    if (userData == null) {
        res.status(403).send("Unauthorized user")
        return
    }
    let { site } = userData

   	Orders.find({ site: site,  date: {
			$gte: new Date(weekArr[1]),
			$lte: new Date(weekArr[5])
		}}, function (err, data) {
			if (err) {
				console.log(err)
			}	
			else {
			let orders = {
				frozen: [0,0,0,0,0],
				whitebag: [0,0,0,0,0],
				brownbag: [0,0,0,0,0]
			};

			data.forEach(order => {
				let day = getDay(weekArr, order.date)-1
				orders.frozen[day] = order.frozen
				orders.whitebag[day] = order.whiteBag
				orders.brownbag[day] = order.brownBag
			})

			res.send({"orders": orders})
		}
	})
 });

// Add or update an Order object to the database given a site, date, and order details
router.post('/', async (req, res) =>{
  let {token,date,frozen, whiteBag, brownBag} = req.body
  date = new Date(date)

  let userData = decodeToken(token)
    if (userData == null) {
        res.status(403).send("Unauthorized user")
        return
    }
    let { site } = userData

  Orders.findOne({site: site, date: date},function (err, data) {
    if (err) {
      console.log(err)
    }
    if (data == undefined) { // new site
		console.log("Creating a new order")
		var order = new Orders({ site,date,frozen, whiteBag, brownBag });
		order.save() .then(data => {
			res.json(data);
		}).catch(err => {
			res.json({ message: err });
		});
    }

    else {
		Orders.updateOne({_id: data._id}, { $set: {frozen: frozen, whiteBag: whiteBag, brownBag: brownBag}}, function(result) {
			console.log("Order updated");
			res.send(data);
		})
	}
  });
});


function getDay(weekArr, date) {
	for(let i = 0; i < weekArr.length; i++) {
		let weekDate = new Date(weekArr[i]).toDateString()
		let compDate = new Date(date).toDateString()
		if (weekDate == compDate) {
			return i
		}
	}
}

module.exports = router;
