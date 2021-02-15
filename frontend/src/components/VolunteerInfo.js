import React, { Component, useState } from 'react';
import '../css/VolunteerInfo.css'
import '../css/Signup.css';
import '../css/Login.css';
import env from "react-dotenv";
import { withRouter } from "react-router-dom";


class VolunteerInfo extends Component{
	constructor(props){
		super(props);
		this.state = {
			personalData: {
                phoneNumber: "",
                email: "",
                days: {},  
                notes: ""
            },
            comments: "Please enter any additional information you would like to include.",

            Monday: false,
            Tuesday: false,
            Wednesday: false,
            Thursday: false,
            Friday: false,

            notCheckedBox: false

		}

		//this.submitInfo = this.submitInfo.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.updateInfo = this.updateInfo.bind(this);

	}

	handleChange = (event) => {
		this.setState({ [event.target.name]: event.target.checked });

		if (event.target.name !== "comments"){
			this.setState({notCheckedBox: false})
		}
	}

	updateInfo = (event) => {
		let personalData = this.state.personalData;
		//console.log(event.target)
        personalData[event.target.id] = event.target.value;

        this.setState({personalData: personalData});
	}

	updateComments = (event) => {
		this.handleChange(event);
		this.updateInfo(event);
		//console.log(this.state.personalData.notes)
	}

	addDays = () => {
		let personalData = this.state.personalData;
		//console.log(daysArray);

		const { Monday, Tuesday, Wednesday, Thursday, Friday } = this.state;

		console.log(Monday)

		let available = {"M": Monday, "T": Tuesday, "W": Wednesday, "Th": Thursday, "F": Friday };
		console.log(available);
		console.log(available.M);

		personalData.days = available;

		this.setState({ personalData: personalData });

	}

	addInfo = (event) => {
		const { Monday, Tuesday, Wednesday, Thursday, Friday } = this.state;
		//check if one box is checked
  		const error = [Monday, Tuesday, Wednesday, Thursday, Friday].filter((v) => v).length < 1;
  		console.log(error)

  		if (error === true) {
  			this.setState({notCheckedBox: true})
  		}
  		else {
			//make sure this works correctly!
			this.addDays();

			console.log(this.state.personalData)
			this.sendVolunteerInfo(this.state.personalData)
  		}

		event.preventDefault();
	}

	sendVolunteerInfo = (info) => {
		let _this = this
        fetch(env.backendURL + 'volunteers/updateVolunteerInfo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(info)
        })
        .then((res) => {
            if (res.status === 404) {
                _this.setState({error: true})
            }
            else {
                _this.props.history.push("/sitemanager");
            }
        })
	}

	//to do:
	// - display page if not filled by user 
	render(){

		const { Monday, Tuesday, Wednesday, Thursday, Friday } = this.state;

		return(
			<div className='VolunteerInfo-form'>
				<h2 id="header"> Volunteer Additional Info </h2>
				
				<form onSubmit={this.addInfo}>
					<label for="phoneNumber"> Phone Number:* </label>
					<br/>
					<input type="text" id="phoneNumber" placeholder='Phone Number' onChange={this.updateInfo} size="12" required/> 
					
					<br/>
					<label for="email"> Email:* </label>
					<br/>
					<input type="email" id="email" placeholder="Email ex: example@gmail.com" onChange={this.updateInfo} size="50" required/>

					<br/>
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



						</div>
						{this.state.notCheckedBox && <div className="checkbox-error">Select one of more days</div>}
					</div>

					<div className="comments">
						<label> Comments  (not required): </label>
						<br/>
						<textarea
						id="notes"
						name="comments"
						value={this.state.comments}
						onChange={this.updateComments}
						rows={5}
						/>
						<br/>

					</div>

					{this.state.error && <div className="signup-error">Email not found</div>}
					<input type="submit" value="Submit"/>
				</form>
				
			</div>
		)
	}
}

export default withRouter(VolunteerInfo);