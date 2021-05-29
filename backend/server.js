const express = require('express')
const bodyParser = require('body-parser')
const cors = require("cors");
var jwt = require("jsonwebtoken");

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var login = require('./src/login')
var signup = require('./src/signup')
var clients = require('./src/clients')
var volunteer = require('./src/volunteers')
var meals = require('./src/meals')
var hours = require('./src/hours')
var orders = require('./src/orders')
var schedules = require('./src/schedules')
var profile = require('./src/profile')

app.use('/login', login)
app.use('/signup', signup)
app.use('/clients', clients)
app.use('/volunteers', volunteer)
app.use('/meals', meals)
app.use('/hours', hours)
app.use('/orders', orders)
app.use('/schedules', schedules)
app.use('/profile', profile)

app.get('/', (req, res) => {
    res.send('Hi from Meals that Connect!')
})

if (process.argv.includes('dev')) {
    const PORT = process.env.PORT || 3001;
    app.listen(PORT, () => console.log(`server running on port ${PORT}`));
}

module.exports = app;

