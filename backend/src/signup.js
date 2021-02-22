const express = require('express');
const router = express.Router();

const bcrypt = require('bcrypt')

const SiteManager = require('../models/SiteManager');
const Volunteer = require('../models/Volunteer');
const DataEntry = require('../models/DataEntry');

router.post('/', async (req, res) =>{
    const {firstName, lastName, email, isAuthenticated, site, user} = req.body
 
    let userType = getUser(user);
  
    userType.findOne({'email': email}).then(function(result) {
       if (result) {
          console.log("email already in use")
          res.status(404).send("email already in use")
       } 
       else {
          const password = bcrypt.hashSync(req.body.password, 9);
          var doc;
          if (user == "volunteer") {
             const {driver, kitchenStaff, isAuthenticated_driver, isAuthenticated_kitchenStaff, phoneNumber, availability} = req.body  
             doc = new userType({ firstName, lastName, email, password, driver, kitchenStaff, isAuthenticated_driver, isAuthenticated_kitchenStaff, site, phoneNumber, availability })
          } else {
             doc = new userType({ firstName, lastName, email, password, isAuthenticated, site })
          }
          doc.save()
          console.log("successfully added user")
          res.status(200).send("success")
       }
    }).catch(err => {
       console.log(err)
       res.send(500).send("Internal server error")
    })
 });
 
 function getUser(user) {
    if(user == "volunteer") {
       return Volunteer
    }
    else if(user == "siteManager") {
       return SiteManager
    }
    else {
       return DataEntry
    }
 }

 module.exports = router;
