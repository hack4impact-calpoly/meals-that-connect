const express = require('express')
const bodyParser = require('body-parser')
const cors = require("cors");
const bcrypt = require('bcrypt');
require('dotenv').config()

const mongoose = require('mongoose')
const connectionURL = `mongodb+srv://${process.env.adminUsername}:${process.env.adminPassword}@cluster1.qtgqg.mongodb.net/Users?retryWrites=true&w=majority`;
mongoose.connect(connectionURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  }).then(() => console.log('Connected to MongoDB'))

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("Successfully connected to mongodb")
});

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const SiteManager = require('./models/SiteManager');
const Volunteer = require('./models/Volunteer');
const DataEntry = require('./models/DataEntry');

// //const signupSiteManager = require('./src/signupSiteManager')
// const login = require('./src/login')
// const signupDataEntry = require('./src/signupDataEntry')
// const signupVolunteer = require('./src/signupVolunteer')

// app.use('/login', login);
// app.use('/signup', signupDataEntry);
// app.use('/signup', signupVolunteer);
// //app.use('/signup', signupSiteManager)


app.get('/', (req, res) => {
    res.send('Hi from Meals that Connect!')
})

app.post('/signup', async (req, res) =>{
   const {firstName, lastName, email, isAuthenticated, site, user} = req.body

   let userType = getUser(user);
 
   userType.findOne({'email': email}).then(function(result) {
      if (result) {
         console.log("email already in use")
         res.send("email already in use")
      } 
      else {
         const password = bcrypt.hashSync(req.body.password, 9);
         const doc = new userType({ firstName, lastName, email, password, isAuthenticated, site })
         doc.save()
         console.log("successfully added user")
         res.send("success")
      }
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

app.listen(3001, () => {
    console.log('App listening on port 3001')
})

