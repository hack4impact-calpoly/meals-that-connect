const mongoose = require('mongoose')
const express = require('express');
const router = express.Router();

const Hours = require("../models/Hours")

router.post('/edit', async (req, res) => {
    const {firstName, lastName, date, newHours} = req.body
    Hours.find({firstName: firstName, lastName: lastName, date: date}, function (err, hourLog) {
        if (err) {
            console.log(err)
        }
        else {
            hourLog[0].hours = newHours
            hourLog[0].save()
            res.send(`${firstName} ${lastName}'s hour log for ${date} was updated`)
        }
    })
})

router.post('/add', async (req, res) => {
    const {firstName, lastName, date, hours} = req.body
    var temp = new Hours({firstName: firstName, lastName: lastName, date: date, hours: hours}, function (err, newHourLog) {
        if (err) {
            console.log(err)
        }
        else {
            temp.save()
            res.send(`${firstName} ${lastName}'s hours added for ${date}`)
        }
    })
})

router.post('/delete', async (req, res) => {
    const {firstName, lastName, date} = req.body
    Hours.deleteOne({firstName: firstName, lastName: lastName, date: date}, function (err, deleted) {
        if (err) {
            console.log(err)
        }
        else {
            res.send(`${firstName} ${lastName}'s hour log for ${date} was deleted`)
        }
    })
})

module.exports = router;