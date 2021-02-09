const express = require('express')
const bodyParser = require('body-parser')
const cors = require("cors");
require('dotenv').config()

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var login = require('./src/login')
var signup = require('./src/signup')
var clients = require('./src/getClients')
var tables = require('./src/volunteerTables')

app.use('/login', login)
app.use('/signup', signup)
app.use('/clients', clients)
app.use('/tables', tables)

app.get('/', (req, res) => {
    res.send('Hi from Meals that Connect!')
})

//ensure email is database
app.get('api/recipe/:email', (req, res) => {
    const email = req.params.name
    let userInfo
    //get user that has that certain email
    //userInfo = await DatabaseName.find({email: })
})
  
app.listen(3001, () => {
    console.log('App listening on port 3001')
})
