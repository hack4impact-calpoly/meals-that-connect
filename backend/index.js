const express = require('express')
const app = express()
const bodyParser = require('body-parser')

require('dotenv').config()
app.use(express.static('html'))

const mongoose = require('mongoose')
const connectionURL = `mongodb+srv://${process.env.adminUsername}:${process.env.adminPassword}@cluster1.qtgqg.mongodb.net/Users?retryWrites=true&w=majority`;

const signupSiteManager = require('./src/signupSiteManager')


const login = require('./src/login')
const signupDataEntry = require('./src/signupDataEntry')
const signupVolunteer = require('./src/signupVolunteer')

const SiteManager = require('./models/SiteManager');
const bcrypt = require('bcrypt');
app.use(bodyParser.json())


app.use('/login', login);
app.use('/signup', signupDataEntry);
app.use('/signup', signupVolunteer);

mongoose.connect(connectionURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
}).then(() => console.log('Connected to MongoDB'))
/*
app.use('/signup', signupSiteManager)
*/
app.get('/', (req, res) => {
    res.send('Hi from Meals that Connect!')
})

const createSiteManagerAccount = async (firstName, lastName, email, password, isAuthenticated, site) => {
   return new SiteManager({
     firstName,
     lastName,
     email,
     password,
     isAuthenticated,
     site
   })
}

app.post('/signup', async (req, res) =>{
   const firstName = req.body.firstName
   const lastName = req.body.lastName
   const email = req.body.email 
 /*
 SiteManager.findOne({email: email}).then(function(result) {
      if (result == null) {
         res.send("email already in use")
     res.redirect('/signup');
        alert("email already in use");
      } else {
         console.log("wack")
      }
   })
 */
   isEmailUsed(email).then(function(valid) {
      if (valid) {
         console.log("nice")
      } else {
         res.send("email alreay used")
      }
   })

   const password = bcrypt.hashSync(req.body.password, 9);
   const isAuthenticated = req.body.isAuthenticated
   const site = req.body.site
   const user =  await createSiteManagerAccount(firstName, lastName, email, password, isAuthenticated, site)
   res.json(user)
});

function isEmailUsed(email) {
   return SiteManager.findOne({email: email}).then(function(result) {
      return result !== null;
   })
}

app.listen(3001, () => {
    console.log('App listening on port 3001')
})

