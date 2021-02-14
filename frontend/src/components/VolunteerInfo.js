import React, { Component, useState } from 'react';
import '../css/VolunteerInfo.css'
import '../css/Signup.css';
import '../css/Login.css'

//npm install @material-ui/core
import { makeStyles } from '@material-ui/core/styles';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';

class VolunteerInfo extends Component{
	constructor(props){
		super(props);
		this.state = {
			personalData: {
                phoneNumber: "",
                email: "",
                days: [], //may change look at user type 
                password: "",
                site: ""
            },
            comments: "Please enter any additional information you would like to include.",
            Monday: false,
            Tuesday: false,
            Wednesday: false,
            Thursday: false,
            Friday: false,
            Saturday: false,
            Sunday: false
		}

	}

	handleCheckedBox = (event) => {
		this.setState({ [event.target.name]: event.target.checked });

		let daysArray = this.state.personalData.days;
		console.log(daysArray);
		console.log(event.target.name)

		if (event.target.checked == true){
			//daysArray.push(event.target.label)

		}
	}

	render(){

		const { Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday } = this.state;
  		const error = [Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday].filter((v) => v).length < 1;

		return(
			<div className='VolunteerInfo-form'>
				<h2 id="header"> Volunteer Additional Info </h2>
				
				<label for="phoneNumber">Phone Number: </label>
				<label id="phone-label"> (Enter your phone number below in the following format: (###)###-####)</label>
				<input type="text" id="phoneNumber" placeholder='Phone Number' size="22" required/> 

				<input type="text" id="email" placeholder="Email ex: example@gmail.com" size="50" required/>
				
				<div className="days-display">
				<FormControl required error={error} >
					<FormLabel id="days-text"> Select Days Available: </FormLabel>
					<FormGroup id="days-row">
          			<FormControlLabel
            			control={<Checkbox checked={Monday} onChange={this.handleCheckedBox} name="Monday" id="days-text" />}
            		label="Monday"
          			/>
          			<FormControlLabel
            		control={<Checkbox checked={Tuesday} onChange={this.handleCheckedBox} name="Tuesday" />}
            		label="Tuesday"
          			/>
          			<FormControlLabel
            		control={<Checkbox checked={Wednesday} onChange={this.handleCheckedBox} name="Wednesday" />}
            		label="Wednesday"
          			/>
          			<FormControlLabel
            		control={<Checkbox checked={Thursday} onChange={this.handleCheckedBox} name="Thursday" />}
            		label="Thursday"
          			/>
          			<FormControlLabel
            		control={<Checkbox checked={Friday} onChange={this.handleCheckedBox} name="Friday" />}
            		label="Friday"
          			/>
          			<FormControlLabel
            		control={<Checkbox checked={Saturday} onChange={this.handleCheckedBox} name="Saturday" />}
            		label="Saturday"
          			/>
          			<FormControlLabel
            		control={<Checkbox checked={Sunday} onChange={this.handleCheckedBox} name="Sunday" />}
            		label="Sunday"
          			/>
        			</FormGroup>
        			<FormHelperText>Select one or more days.</FormHelperText>
				</FormControl>
				</div>


				<label> Comments(not required): </label>
				<br/>
				<textarea value={this.state.comments} />
				

				
			</div>
		)
	}
}

export default VolunteerInfo;