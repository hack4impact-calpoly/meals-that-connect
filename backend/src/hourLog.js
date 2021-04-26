const mongoose = require('mongoose')
const express = require('express');
const router = express.Router();

const Volunteer = require('../models/Volunteer');
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
    console.log(req.body)
    Volunteer.findOne({'volunteerID': volunteerID}).then(function(result) {
        if (!result) {
            console.log('not a volunteer')
        }
        else {
            var temp = new Hours({'volunteerID' : volunteerID, 'date': date, 'home': hours})
            temp.save()
            console.log('successfully added hours')
        }
    }).catch(err => {
        console.log(err)
        res.send(500).send("Internal server error")
    })
})

router.post('/delete', async (req, res) => {
    const {_id} = req.body
    console.log(req.body)
    Hours.deleteOne({_id: _id}, function (err, deleted) {
        if (err) {
            console.log(err)
        }
        else {
            res.send(`Successfully deleted hour log`)
        }
    })
})

router.post('/all', async (req, res) => {
    const {volunteerID} = req.body
    Hours.find({volunteerID: volunteerID}, function (err, hours) {
      if (err) {
        console.log(err)
        res.send(err)
      }
      else {
        hours = hours.sort((a, b) => (a.date < b.date) ? 1 : -1 )
        res.send(hours)
        console.log(hours)
      }
    })
  })

module.exports = router;
