const express = require('express');
const router = express.Router();

const bcrypt = require('bcrypt');

const SiteManager = require('.././models/SiteManager');

const createSiteManagerAccount = async (firstName, lastName, email, password, isAuthenticated, site) => {
   return new SiteManager({
      firstName,
      lastName,
      email,
      password,
      isAuthenticated,
      site
   }).save()
}

router.post('/signup', async (req, res) => {
   const firstName = req.body.firstName
   const lastName = req.body.lastName
   console.log("1st")    
   
   if (isEmailUsed(req.body.email)) {
      const email = req.body.email
   } else {
      res.send("Email is already in use");
   }
    
   const password = bcrypt.hashSync(req.body.password, 9);
   
   const isAuthenticated = req.body.isAuthenticated
   const site = req.body.site

   const user = await createSiteManagerAccount(firstName, lastName, email, password, isAuthenticated, site)
   res.json(user)

})

function isEmailUsed1(email) {
   return SiteManager.findOne({email: email}).then(result => {
      if (result) {
         console.log("invalid");
         return false;
      } else {
         console.log('YES');
         return true;
      }
   });
}
/*
function isEmailUsed(email) {
   if (SiteManager.findOne({email: email}) === null) {
      console.log("here2")
      return true;
   }
   return false;
}
*/

module.exports = router;
