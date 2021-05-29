const mongoose = require('mongoose')
const express = require('express');
const router = express.Router();

const Client = require("../models/clients")
const decodeToken = require("./token.js")

/*
  Contains methods:
    addClient: Creates a new client for the given site
    delete: Deletes the client with the provided clientID
    site: Returns all the clients for the provided site
    id: Returns the clients with the provided clientID
    update-routes: Update 1 client field for the provided client
    update-client-routes: Update the index field for all clients
    update-client: Updates all client data
    update-data: Updates some client data. Called from the routes table
*/

router.post('/addClient', async (req, res) => {
  const { firstName, lastName, address, foodDays, frozenNumber, frozenDay, phoneNumber, emergencyNumber, emergencyContact, 
          emergencyPhone, noMilk, specialInstructions, clientC2, NE, email, holidayFrozen, routeNumber, token} = req.body

  let userData = decodeToken(token)
  if (userData == null) {
      res.status(403).send("Unauthorized user")
      return
  }
  let site = userData.site

  console.log("Adding client")
  Client.findOne({'email': email}).then(function(result) {
  if (result) {
    console.log("email already in use")
    res.status(404).send("email already in use")     
  }
  else {
    Client.countDocuments({site: site, routeNumber: routeNumber}, function(err, index) {
      if (err) {
        console.log(err)
        res.send(500).send("Internal server error")
      }
      else {
        let subservice = ""
        let wellskyID = ""
        var client = new Client({firstName, lastName, address, foodDays, frozenNumber, frozenDay, phoneNumber, 
                                emergencyNumber, emergencyContact, emergencyPhone, noMilk, specialInstructions, 
                                clientC2, NE, email, holidayFrozen, routeNumber, site, index,
                                subservice, wellskyID})
  
        client.save()
        console.log("succcessfully added client")
        res.status(200).send("success")
      }
    })
  }
  }).catch(err => {
    console.log(err)
    res.send(500).send("Internal server error")
  })
})

router.post('/delete', async (req, res) => {
  const { id, token } = req.body

  let userData = decodeToken(token)
  if (userData == null) {
      res.status(403).send("Unauthorized user")
      return
  }

  Client.deleteOne({_id: id}).then(function(result) {
    if (result) {
      console.log("Deleted client")
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


router.post('/site', async (req, res) => {
  const {token} = req.body

  let userData = decodeToken(token)
  if (userData == null) {
      res.status(403).send("Unauthorized user")
      return
  }
  let site = userData.site

  Client.find({site: site, index: {$exists:true}}, function (err, clients) {
    if (err) {
      console.log(err)
    }
    else {
      clients = clients.sort((a, b) => (a.routeNumber > b.routeNumber) ? 1 : (a.routeNumber < b.routeNumber) ? -1 : (a.index >b.index) ? 1 : -1 )
      for (let i = 0; i < clients.length; i++) {
        clients[i].index = i
      }
      res.send(clients)
    }
  })
})

router.post('/id', async (req, res) => {
  const {token} = req.body
  
  let userData = decodeToken(token)
  if (userData == null) {
      res.status(403).send("Unauthorized user")
      return
  }

  const {_id} = req.body
  Client.findOne({_id: _id}, function (err, client) {
    if (err) {
      console.log(err)
    }
    else {
      res.send(client)
    }
  })
})

router.post('/update-routes', async (req, res) => {
   const {token, id, key, data} = req.body

   var query = {}
   query[key] = data;
  
  let userData = decodeToken(token)
  if (userData == null) {
      res.status(403).send("Unauthorized user")
      return
  }

   Client.updateOne({'_id': id}, query)
    .then(function(result) {
        if (!result) {
          console.log("Error in updating info");
          res.send("Error in updating info");
        } else {
          console.log("Information updated");
          res.send("Information updated");
          }
    })
});

router.post('/update-client-routes', async (req, res) => {
  const {clients, token} = req.body

  
  let userData = decodeToken(token)
  if (userData == null) {
      res.status(403).send("Unauthorized user")
      return
  }

  for (let i = 0; i < clients.length; i++) {
    Client.updateOne({'_id': clients[i].id}, {'index': clients[i].index})
    .then(function(result) {
        if (!result) {
          console.log("Error in updating info");
          res.send("Error in updating info");
          return;
        } else {
          console.log("Information updated");
          }
    })
  }

  res.send("Information updated");
});

router.post('/update-client', async (req, res) => {
  const { token,
          firstName,
          lastName,
          address,
          foodDays,
          frozenNumber,
          frozenDay,
          phoneNumber,
          emergencyContact,
          emergencyPhone,
          noMilk,
          specialInstructions,
          clientC2,
          NE,
          email,
          holidayFrozen,
          routeNumber,
          site,
          index,
          id} = req.body

  
  let userData = decodeToken(token)
  if (userData == null) {
      res.status(403).send("Unauthorized user")
      return
  }

  Client.updateOne({'_id': id}, 
            { firstName: firstName,
              lastName: lastName,
              address: address,
              foodDays: foodDays,
              frozenNumber: frozenNumber,
              frozenDay: frozenDay,
              phoneNumber: phoneNumber,
              emergencyContact: emergencyContact,
              emergencyPhone: emergencyPhone,
              noMilk: noMilk,
              specialInstructions: specialInstructions,
              clientC2: clientC2,
              NE: NE,
              email: email,
              holidayFrozen: holidayFrozen,
              routeNumber: routeNumber,
              site: site,
              index: index})
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

router.post('/update-data', async (req, res) => {
  const { token,
          id, 
          firstName, 
          lastName, 
          address,   
          phoneNumber, 
          emergencyContact, 
          emergencyPhone,   
          specialInstructions, 
          clientC2, 
          NE, 
          email, 
        } = req.body

  let userData = decodeToken(token)
  if (userData == null) {
      res.status(403).send("Unauthorized user")
      return
  }

  Client.updateOne({'_id': id}, 
            { firstName: firstName,
              lastName: lastName,
              address: address,
              phoneNumber: phoneNumber,
              emergencyContact: emergencyContact,
              emergencyPhone: emergencyPhone,
              specialInstructions: specialInstructions,
              clientC2: clientC2,
              NE: NE,
              email: email})
    .then(function(result) {
        if (!result) {
          console.log("Error in updating info");
          res.send("Error in updating info");
          return;
        } else {
          console.log("Client information updated");
          }
    })
  res.send("Information updated");
});

module.exports = router;
