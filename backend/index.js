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
var volunteer = require('./src/getVolunteers')
var meals = require('./src/meals')
var hours = require('./src/hourLog')

app.use('/login', login)
app.use('/signup', signup)
app.use('/clients', clients)
app.use('/tables', tables)
app.use('/volunteers', volunteer)
app.use('/meals', meals)
app.use('/hours', hours)

app.get('/', (req, res) => {
    res.send('Hi from Meals that Connect!')
})
  
app.listen(3001, () => {
    console.log('App listening on port 3001')
})
