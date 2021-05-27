const express = require('express');
const router = express.Router();

const Volunteer = require('../models/volunteer')
const decodeToken = require("./token.js")

/*
  Contains methods:
    addVolunteer: Create a new volunteer
    id: Fetch the volunteer with the provided ID
    volunteerComplete: 
    delete: Delete the volunteer with the provided ID
    volunteerSite: Find all the volunteers at the provided site
    update-volunteer: Update all fields for a provided volunteer
    update-volunteers: Update 1 field for a provided volunteer
    availability: Fetch all volunteers who are available to drive on a given weekday at the provided site
    updateVolunteerInfo: Update the provided volunteer's phone number, availability and note
*/

router.post('/addVolunteer', async (req, res) => {
  let { token, firstName, lastName, email, password, driver, kitchenStaff, isAuthenticated_driver, isAuthenticated_kitchenStaff, 
        phoneNumber, availability, notes, digitalSystem, completedOrientation} = req.body  
  var volunteerID = getID();
  password = "Placeholder"

  let userData = decodeToken(token)
  if (userData == null) {
      res.status(403).send("Unauthorized user")
      return
  }
  let site = userData.site

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
  volun.save()
  console.log("succcessfully added volunteer")
  res.status(200).send("success")
  }).catch(err => {
    console.log(err)
    res.send(500).send("Internal server error")
  })
})

router.post('/id', async (req, res) => {
  const {token, _id} = req.body

  let userData = decodeToken(token)
  if (userData == null) {
      res.status(403).send("Unauthorized user")
      return
  }

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
  const { id, token } = req.body

  let userData = decodeToken(token)
  if (userData == null) {
      res.status(403).send("Unauthorized user")
      return
  }

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
  const {token} = req.body

  let userData = decodeToken(token)
  if (userData == null) {
      res.status(403).send("Unauthorized user")
      return
  }
  let site = userData.site 

  Volunteer.find({site: site}, function (err, volunteers) {
    if (err) {
      console.log(err)
    }
    else {
      res.send(volunteers)
    }
  })
})

router.post('/availability', async (req, res) => {
  const {token} = req.body

  let userData = decodeToken(token)
  if (userData == null) {
      res.status(403).send("Unauthorized user")
      return
  }
  let site = userData.site 

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
          console.log(volunteer)
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

router.post('/updateVolunteerInfo', async (req, res) => {
  const { token, phoneNumber, email, days, notes } = req.body

  let userData = decodeToken(token)
  if (userData == null) {
      res.status(403).send("Unauthorized user")
      return
  }

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
  const { token,
          firstName,
          lastName,
          availability,
          phoneNumber,
          notes,
          digitalSystem,
          completedOrientation,
          id} = req.body

  let userData = decodeToken(token)
  if (userData == null) {
      res.status(403).send("Unauthorized user")
      return
  }
  let site = userData.site

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
  const {token, id, key, data} = req.body
  var query = {}
  query[key] = data;

  let userData = decodeToken(token)
  if (userData == null) {
      res.status(403).send("Unauthorized user")
      return
  }

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
  const { token, email } = req.body

  let userData = decodeToken(token)
  if (userData == null) {
      res.status(403).send("Unauthorized user")
      return
  }

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
