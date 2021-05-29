const mongoose = require('mongoose')
const express = require('express');
const router = express.Router();

const Volunteer = require('../models/volunteer')
const Hours = require("../models/hours")
const moment = require('moment')

router.post('/addVolunteer', async (req, res) => {
  let {firstName, lastName, email, password, driver, kitchenStaff, isAuthenticated_driver, isAuthenticated_kitchenStaff, site, phoneNumber, availability, notes, digitalSystem, completedOrientation} = req.body  
  console.log(req.body)
  var volunteerID = getID();
  password = "Placeholder"
  let admin = false
  Volunteer.findOne({'email': email}).then(function(result) {
  if (result) {
    console.log("email already in use")
     res.status(404).send("email already in use")     
  }
  digitalSystem = false
  var volun = new Volunteer({volunteerID, firstName, lastName, email, password, driver, kitchenStaff, 
                            isAuthenticated_driver, isAuthenticated_kitchenStaff, site, phoneNumber, 
                            availability, notes, digitalSystem, completedOrientation, admin})
  console.log(volun)
  volun.save()
  console.log("succcessfully added volunteer")
  res.status(200).send("success")
  }).catch(err => {
    console.log(err)
    res.send(500).send("Internal server error")
  })
})

router.post('/id', async (req, res) => {
  console.log("getting volunteer")
  const {_id} = req.body
  Volunteer.findOne({_id: _id}, function (err, volunteer) {
    if (err) {
      console.log(err)
    }
    else {
      res.send(volunteer)
    }
  })
})

router.post('/delete', async (req, res) => {
  const { id } = req.body
  Volunteer.deleteOne({_id: id}).then(function(result) {
    if (result) {
      console.log("Deleted volunteer")
      res.status(200).send("Deleted")   
      return   
    }
    else {
      res.send(500).send("Failed to delete")
    }
    }).catch(err => {
      res.send(500).send("Failed to delete")
  })
})

router.post('/volunteerSite', async (req, res) => {
  const {site} = req.body
  Volunteer.find({site: site}, function (err, volunteers) {
    if (err) {
      console.log(err)
    }
    else {
      res.send(volunteers)
    }
  })
})

router.post('/volunteer-driver-check', async (req, res) => {
  const {site, email, volunteerID} = req.body
  console.log("checking if volunteer is a driver")

  Volunteer.find({site: site, email: email, volunteerID: volunteerID}, function (err, volunteer) {
    if (err) {
      console.log(err)
    }
    else {
      //console.log(volunteer[0].driver)
      res.send(volunteer[0].driver)
    }
  })

})

router.post('/availability', async (req, res) => {
    const {site} = req.body
    Volunteer.find({site: site, driver: true}, function (err, volunteers) {
        let daily_availability = {
        M: [],
        T: [],
        W: [],
        Th: [],
        F: []
        }
        let days = [ 'M', 'T', 'W', 'Th', 'F' ]

        volunteers.forEach(volunteer => {
            let availability = volunteer.availability
            //console.log(volunteer)
            for (let day of days) {
                if (availability[day]) {
                    let volunteerObj = {
                        name: volunteer.firstName + " " + volunteer.lastName,
                        id: volunteer._id
                    }
                    daily_availability[day].push(volunteerObj)
                }
            }
        })
        if (err) {
            console.log(err)
        }
        else {
            res.send(daily_availability)
        }
    })
})

router.post('/current-volunteer', async (req, res) => {
  const {site, email} = req.body

  Volunteer.find({site: site, email: email}, function (err, volunteer) {
    //console.log(volunteer)
    //console.log(volunteer[0].firstName)
      let info = {

        firstName: volunteer[0].firstName,
        lastName: volunteer[0].lastName,
        id: volunteer[0]._id
      }
      //console.log(info)

      if (err) {
        console.log(err)
      }
      else {
          res.send(info)
      }

  })
})

router.get('/allVolunteers', async (req, res) => {
  Volunteer.find({}, function (err, volunteer) {
    if (err) {
      console.log(err)
    }
    else {
      res.send(volunteer)
    }
  })
})

router.post('/updateVolunteerInfo', async (req, res) => {
  const { phoneNumber, email, days, notes } = req.body


  Volunteer.findOne({"email": email}).then(function(volunteer) {
    if (!volunteer) {
      console.log("email not valid")
      res.status(404).send("email not valid")
    }
    else {
      updateVolunteer(email, phoneNumber, days, notes)
      res.status(200).send("success")
      console.log("success")
      //console.log(volunteer)
    }
  })
})

router.post('/update-volunteer', async (req, res) => {
  const { firstName,
          lastName,
          availability,
          phoneNumber,
          site,
          notes,
          digitalSystem,
          completedOrientation,
          id} = req.body

  Volunteer.updateOne({'_id': id}, 
            { firstName: firstName,
              lastName: lastName,
              availability: availability,
              phoneNumber: phoneNumber,
              site: site,
              notes: notes,
              digitalSystem: digitalSystem,
              completedOrientation: completedOrientation
            })
    .then(function(result) {
        if (!result) {
          console.log("Error in updating info");
          res.send("Error in updating info");
          return;
        } else {
          console.log("Information updated");
          }
    })
  res.send("Information updated");
});

router.post('/update-volunteers', async (req, res) => {
  const {id, key, data} = req.body
  console.log(id);
  var query = {}
  query[key] = data;

  Volunteer.updateOne({'volunteerID': id}, query)
   .then(function(result) {
       if (!result) {
         console.log("Error in updating info");
         res.send("Error in updating info");
       } else {
         console.log("Information updated");
         res.send("Information updated");
         }
   })
 })

router.post('/update-field', async (req, res) => {
  const {volunteerID, key, value} = req.body
  console.log(req.body)

  var query = {}
  query[key] = value;
  console.log(query)

  Volunteer.updateOne({'volunteerID': volunteerID}, query)
   .then(function(result) {
      if (!result) {
         console.log("Error in updating info");
         res.send("Error in updating info");
      } 
      else {
         console.log("Information updated");
         res.send("Information updated");
      }
  });
})

router.post('/volunteerComplete', async(req, res) => {
  const { email } = req.body
  
  Volunteer.findOne({"email": email}).then(function(volunteer) {
    if (!volunteer) {
      //console.log(volunteer)
      res.status(404).send("email not valid")
    }
    else {
      if (volunteer.phoneNumber !== "0") {
        res.status(200).send("Info completed")
        console.log("Info completed")
      }
      else {
        res.status(300).send("not completedInfo")
        console.log("not completedInfo")
      }
    }
  })
})

router.post('/volunteerDelete', async(req, res) => {
  const { email } = req.body

  Volunteer.deleteOne({"email": email})
    .then(function(volunteer) {
      if (!volunteer) {
        console.log(volunteer)
        res.status(404).send("email not valid")
      }
      else {
        if (volunteer.phoneNumber !== "0") {
          res.status(200).send("Info completed")
          console.log("Info completed")
        }
        else {
          res.status(404).send("not completedInfo")
          console.log("not completedInfo")
        }
      }
    })
})

async function updateVolunteer(email, phoneNumber, days, notes) {
  await Volunteer.updateOne(
      {email: email},
      {$set: {phoneNumber: phoneNumber, availability: days, notes: notes }}
      )
      console.log("set")
}

// Generates random string ID. Very low probability of duplicate IDs
function getID() {
  return '_' + Math.random().toString(36).substr(2, 9);
}

module.exports = router;
