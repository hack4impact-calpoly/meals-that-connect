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
var profile = require('./src/profile')
var orders = require('./src/getOrderTotals')

app.use('/login', login)
app.use('/signup', signup)
app.use('/clients', clients)
app.use('/tables', tables)
app.use('/volunteers', volunteer)
app.use('/meals', meals)
app.use('/hours', hours)
app.use('/profile', profile)
app.use('/orders', orders)

app.get('/', (req, res) => {
    res.send('Hi from Meals that Connect!')
})

if (process.argv.includes('dev')) {
    const PORT = process.env.PORT || 3001;
    app.listen(PORT, () => console.log(`server running on port ${PORT}`));
}

module.exports = app;

