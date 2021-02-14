import React, { Component, useState } from 'react';
import '../css/VolunteerInfo.css'
import '../css/Signup.css';
import '../css/Login.css'
import env from "react-dotenv";

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
            },
            comments: "Please enter any additional information you would like to include.",

            Monday: false,
            Tuesday: false,
            Wednesday: false,
            Thursday: false,
            Friday: false,
            Saturday: false,
            Sunday: false,

            checkedBox: false
		}

	}

	handleChange = (event) => {
		this.setState({ [event.target.name]: event.target.checked });
	}

	updateInfo = (event) => {
		let personalData = this.state.personalData;
        personalData[event.target.id] = event.target.value;

        this.setState({personalData: personalData});
	}

	addDays = () => {
		let personalData = this.state.personalData;
		let daysArray = personalData.days;
		//console.log(daysArray);

		const { Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday } = this.state;

		if (Monday && !daysArray.includes("Monday")){ daysArray.push("Monday") }
		if (Tuesday && !daysArray.includes("Tuesday")){ daysArray.push("Tuesday") }
		if (Wednesday && !daysArray.includes("Wednesday")){ daysArray.push("Wednesday") }
		if (Thursday && !daysArray.includes("Thursday")){ daysArray.push("Thursday") }
		if (Friday && !daysArray.includes("Friday")){ daysArray.push("Friday") }
		if (Saturday && !daysArray.includes("Saturday")){ daysArray.push("Saturday") }
		if (Sunday && !daysArray.includes("Sunday")){ daysArray.push("Sunday") }

		personalData.days = daysArray;

		this.setState({ personalData: personalData });

		//console.log(Monday);
		//console.log(!daysArray.includes("Monday"));
		//console.log(daysArray);
	}

	submitInfo = (event) => {
		//make sure this works correctly!
		this.addDays();

		this.sendVolunteerInfo(this.state.personalData)

		event.preventDefault();
	}

	sendVolunteerInfo = (info) => {

	}

	//to do:
	// - make phone num, email, days required ~ throw error if not filled
	// - display page if not filled by user
	render(){

		const { Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday } = this.state;
  		const error = [Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday].filter((v) => v).length < 1;

		return(
			<div className='VolunteerInfo-form'>
				<h2 id="header"> Volunteer Additional Info </h2>
				
				<form onSumbit={this.submitInfo}>
					<label for="phoneNumber"> Phone Number:* </label>
					<br/>
					<label id="phone-label"> (Enter your phone number below in the following format: (###)###-####)</label>
					<br/>
					<input type="text" id="phoneNumber" placeholder='Phone Number' onChange={this.updateInfo} size="22" required/> 

					<br/>
					<label for="email"> Email:* </label>
					<br/>
					<input type="text" id="email" placeholder="Email ex: example@gmail.com" onChange={this.updateInfo} size="50" required/>

					<div className="days-display">
						<label id="days-text">Select Days Available:* </label>

						<div className="days-row">

							<label id="checkbox-display"> 
								<input name="Monday"  
								type="checkbox" 
								checked={Monday} 
								onChange={this.handleChange} />
							 	Monday 
							</label>

							<label id="checkbox-display"> 
								<input name="Tuesday"  
								type="checkbox" 
								checked={Tuesday} 
								onChange={this.handleChange} />
							 	Tuesday 
							</label>

							<label id="checkbox-display"> 
								<input name="Wednesday"  
								type="checkbox" 
								checked={Wednesday} 
								onChange={this.handleChange} />
							 	Wednesday 
							</label>

							<label id="checkbox-display"> 
								<input name="Thursday"  
								type="checkbox" 
								checked={Thursday} 
								onChange={this.handleChange} />
							 	Thursday 
							</label>

							<label id="checkbox-display"> 
								<input name="Friday"  
								type="checkbox" 
								checked={Friday} 
								onChange={this.handleChange} />
							 	Friday 
							</label>

							<label id="checkbox-display"> 
								<input name="Saturday"  
								type="checkbox" 
								checked={Saturday} 
								onChange={this.handleChange} />
							 	Saturday 
							</label>

							<label id="checkbox-display"> 
								<input name="Sunday"  
								type="checkbox" 
								checked={Sunday} 
								onChange={this.handleChange} />
							 	Sunday
							</label>


						</div>
					</div>
				
				<div className="days-display">
				<FormControl required error={error} >
					<FormLabel id="days-text"> Select Days Available: </FormLabel>
					<FormGroup id="days-row">
          			
        			</FormGroup>
        			<FormHelperText>Select one or more days.</FormHelperText>
				</FormControl>
				</div>

					<div className="comments">
					<label> Comments  (not required): </label>
					<br/>
					<textarea
					name="comments"
					value={this.state.comments}
					onChange={this.handleChange}
					rows={5}
					/>
					<br/>
					
					</div>

					<input type="submit" value="Submit"/>
					

				</form>
				

				
			</div>
		)
	}
}

export default VolunteerInfo;