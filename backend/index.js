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

var login = require('./src/login')
var signup = require('./src/signup')

app.use('/login', login)
app.use('/signup', signup)

app.get('/', (req, res) => {
    res.send('Hi from Meals that Connect!')
})

app.listen(3001, () => {
    console.log('App listening on port 3001')
})

