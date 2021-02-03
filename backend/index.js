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

app.use('/login', login)
app.use('/signup', signup)
app.use('/clients', clients)

app.get('/', (req, res) => {
    res.send('Hi from Meals that Connect!')
})

app.listen(3001, () => {
    console.log('App listening on port 3001')
})
