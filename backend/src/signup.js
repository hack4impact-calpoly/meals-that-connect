const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs')
require('dotenv').config()

const SiteManager = require('../models/siteManager');
const Volunteer = require('../models/volunteer');
const DataEntry = require('../models/dataEntry');

router.post('/email-taken', async (req, res) =>{
   const {email, user} = req.body
   let userType = getUser(user);
 
   userType.findOne({'email': email}).then(function(result) {
      if (result) {
         console.log("email already in use")
         res.status(404).send("email already in use")
      } 
      else {
         res.status(200).send("valid email")
      }
   });
});

// router.get('/delete', async (req, res) =>{
//    var myquery = { 'firstName': "Emily" };
//    SiteManager.deleteMany(myquery, function(err, obj) {
//       if (err) throw err;
//       console.log(obj);
//    });
// });

router.post('/', async (req, res) =>{
    const {firstName, lastName, email, isAuthenticated, site, user} = req.body
    const password = bcrypt.hashSync(req.body.password, 9);
 
    let userType = getUser(user);
    console.log(user)
    console.log(userType)
    if (userType == null) {
       res.status(404).send("Invalid user type") 
       return;
    }
  
    userType.findOne({'email': email}).then(function(result) {
       if (result) {
          console.log("email already in use")
          res.status(404).send("email already in use")
       } 
       else {
          var doc;
          if (user == "volunteer") {
             var volunteerID = getID();
             const {driver, kitchenStaff, isAuthenticated_driver, isAuthenticated_kitchenStaff, phoneNumber, availability} = req.body  
             doc = new userType({ volunteerID, firstName, lastName, email, password, driver, kitchenStaff, 
                     isAuthenticated_driver, isAuthenticated_kitchenStaff, site, phoneNumber, availability, admin: false })
          } else {
             doc = new userType({ firstName, lastName, email, password, isAuthenticated, site, admin: false })
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

async function newAdminUser(data, password, userType) {
   let { firstName, lastName, email, isAuthenticated, site} = data
   let output = false

   await userType.findOne({'email': email}).then(function(result) {
      if (result) {
         console.log("email already in use")
         return false
      } 
      else {
         var doc;
         if (data.user == "volunteer") {
            var volunteerID = getID();
            const {driver, kitchenStaff, isAuthenticated_driver, isAuthenticated_kitchenStaff, phoneNumber, availability} = data 
            doc = new userType({ volunteerID, firstName, lastName, email, password, driver, kitchenStaff, 
                    isAuthenticated_driver, isAuthenticated_kitchenStaff, site, phoneNumber, availability, admin: true })
         } else {
            doc = new userType({ firstName, lastName, email, password, isAuthenticated, site, admin: true })
         }
         doc.save()
         output = true
         return true
      }
   }).catch(err => {
      console.log(err)
      return false
   })
   return output
 }

 router.post('/admin', async (req, res) =>{
   const { code } = req.body
   const password = bcrypt.hashSync(req.body.password, 9);
   if (code !== process.env.ADMIN_CODE) {
      res.status(404).send("Invalid code")
      console.log("Invalid code")
      return;
   }

   let created = await newAdminUser(req.body, password, Volunteer)
   if (!created) { 
      res.status(404).send("email already in use")
      return
   }
   created = await newAdminUser(req.body, password, SiteManager)
   if (!created) { 
      res.status(404).send("email already in use")
      return
   }
   created = await newAdminUser(req.body, password, DataEntry)
   if (!created) { 
      res.status(404).send("email already in use")
      return
   }

   res.status(200).send("Successfully added all user types")
})
 
//    await Volunteer.findOne({'email': email}).then(function(result) {
//       if (result) {
//          console.log("email already in use")
//          res.status(404).send("email already in use")
//          return;
//       } 
//       else {
//          var volunteerID = getID();
//          const {driver, kitchenStaff, isAuthenticated_driver, isAuthenticated_kitchenStaff, phoneNumber, availability} = req.body  
//          var doc = new Volunteer({ volunteerID, firstName, lastName, email, password, driver, kitchenStaff, 
//             isAuthenticated_driver, isAuthenticated_kitchenStaff, site, phoneNumber, availability, admin: true })
//          doc.save().then(result => {
//             output = output + " successfully added volunteer"
//             console.log(output)
//          })
//          console.log("successfully added volunteer")
//       }
//    }).catch(err => {
//       console.log(err)
//       res.send(500).send("Internal server error")
//       return;
//    })

//    await SiteManager.findOne({'email': email}).then(function(result) {
//       if (result) {
//          console.log("email already in use")
//          res.status(404).send("email already in use")
//          return;
//       } 
//       else {
//          var doc = new SiteManager({ firstName, lastName, email, password, isAuthenticated, site, admin: true })
//          doc.save().then(result => {
//             output = output + " successfully added site manager"
//             console.log(output)
//          })
//          console.log("successfully added site manager")
//       }
//    }).catch(err => {
//       console.log(err)
//       res.send(500).send("Internal server error")
//       return;
//    })

//    await DataEntry.findOne({'email': email}).then(function(result) {
//       if (result) {
//          console.log("email already in use")
//          res.status(404).send("email already in use")
//          return;
//       } 
//       else {
//          var doc = new DataEntry({ firstName, lastName, email, password, isAuthenticated, site, admin: true })
//          doc.save().then(result => {
//             output = output + " successfully added data entry"
//             console.log(output)
//          })
//          console.log("successfully added data entry")
//          res.status(200).send(output)
//       }
//    }).catch(err => {
//       console.log(err)
//       res.send(500).send("Internal server error")
//    })
// });

// Generates random string ID. Very low probability of duplicate IDs
function getID() {
   return '_' + Math.random().toString(36).substr(2, 9);
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
 module.exports = router;
