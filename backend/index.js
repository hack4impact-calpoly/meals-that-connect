const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.send('Hi from Meals that Connect!')
})
  
app.listen(3001, () => {
    console.log('App listening on port 3001')
})