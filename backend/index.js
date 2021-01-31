const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.json())

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
