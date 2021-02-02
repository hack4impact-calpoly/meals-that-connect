const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.send('Hi from Meals that Connect!')
})

//ensure email is database
app.get('api/resetPWRD/:email', async(req, res) => {
    const email = req.params.email
    let userInfo

    //get user that has that certain email
    //userInfo = await DatabaseName.find({email: email})

    //send user email
    //res.json(userInfo)

    //console.log success
    //console.log("getting email works!")
 
})

// use to update password
app.post('api/setNewPwrd', async(req, res) => {
	// get email
	//const email = req.body.email

	//get updated password from document
	//const password = req.body.password

	//update database with password
	//await DatabaseName.updateOne(
	//	{email: email}
	//	{$set: {"password": password}
	//})
})
  
app.listen(3001, () => {
    console.log('App listening on port 3001')
})
