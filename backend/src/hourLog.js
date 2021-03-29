const mongoose = require('mongoose')
const express = require('express');
const router = express.Router();

const Hours = require("../models/Hours")

router.post('/edit', async (req, res) => {
    const {volunteerID, date, newHours} = req.body
    Hours.find({volunteerID: volunteerID, date: date}, function (err, hourLog) {
        if (err) {
            console.log(err)
        }
        else {
            hourLog[0].hours = newHours
            hourLog[0].save()
            res.send(`Successful hour log for ${date} was updated`)
        }
    })
})

router.post('/add', async (req, res) => {
    const {volunteerID, date, hours} = req.body
    var temp = new Hours({volunteerID: volunteerID, date: date, hours: hours}, function (err, newHourLog) {
        if (err) {
            console.log(err)
        }
        else {
            temp.save()
            res.send(`Successful hours added for ${date}`)
        }
    })
})

router.post('/delete', async (req, res) => {
    const {volunteerID, date} = req.body
    Hours.deleteOne({volunteerID: volunteerID, date: date}, function (err, deleted) {
        if (err) {
            console.log(err)
        }
        else {
            res.send(`Successful hour log for ${date} was deleted`)
        }
    })
})

router.get('/all', async (req, res) => {
    const {volunteerID} = req.body
    Hours.find({volunteerID: volunteerID}, function (err, hours) {
      if (err) {
        console.log(err)
        res.send(err)
      }
      else {
        res.send(hours)
        console.log(hours)
      }
    })
  })

module.exports = router;
