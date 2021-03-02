import React, { Component } from 'react';
import '../../css/ResetPassword.css';
import '../../css/Login.css';
import fire from '../../fire.js';
import env from "react-dotenv";

class ResetPassword extends Component{
	constructor(props){
		super(props);
		this.state = {
			email: "",
            emptyUser: false,
			userType: ""
		 };
	}

	handleChange = (e) => {
        this.setState({ [e.target.id]: e.target.value });
    };
	
	changeUserType = (event) => {
        this.setState({userType: event.target.value, emptyUser: false});
    }
	
	firebase_reset_password = () => {
		
		var auth = fire.auth();
		var emailAddress = this.state.email;
		//console.log("here");

		auth.sendPasswordResetEmail(emailAddress).then(function() {
			// Email sent.
			alert("Email has been sent. Please check your email.");
		}).catch(function(error) {
			// An error happened.
			var errorMessage = error.message;
			alert(errorMessage);
			console.log(error);
		});
	
	}

	//firebase function that gets the updated password --> backend

	reset = (e) => {
		e.preventDefault();

		if (this.state.userType == "") {
            this.setState({emptyUser: true})
            return;
        } else {
			this.firebase_reset_password();
		}
	}

	ResetPassword = (userType, email, password) => {
        let _this = this
        fetch(env.backendURL + 'login/reset-password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userType, email, password)
        })
        .then((res) => {
            if (res.status === 404) {
                _this.props.history.push("/volunteer-additional-info");
            }
            else {
                _this.props.history.push("/");
            }
        })
    }

	render(){
		return(
			<div className='auth-form'>
				<h2> Reset Password </h2>
				{/* <br/> */}
				<p> Please select the user type and input your email below. You will be sent a link to reset your password. </p>
				<div id="cta-type">
                    <div id="site-manager">
                        <input type="radio" id="site-manager" name="cta" value="site-manager" onChange={this.changeUserType} checked={null}/>
                        <label for="site-manager">Manager</label>
                    </div>
                    <div id="data-entry">
                        <input type="radio" id="dataEntry" name="cta" value="data-entry" onChange={this.changeUserType} checked={null}/>
                        <label for="data-entry">Data Entry</label>
                    </div>
                    <div id="volunteer">
                        <input type="radio" id="volunteerID" name="cta" value="volunteer" onChange={this.changeUserType} checked={null}/>
                        <label for="volunteer">Volunteer</label>
                    </div>
                </div>
				{/* <p> Please input your email below. You will be sent a link to reset your password. </p> */}
				{/* <br/> */}
				<p className= "input-email">Email</p>
                <input type="text" id="email" size="50" style={{width: '500px'}} onChange={this.handleChange}/>
				<br/>
				{this.state.emptyUser && <div className="error">Select the type of user</div>}
                <button id="reset-button" onClick={this.reset}>SEND EMAIL</button>
			</div>
		)
	}
}


export default ResetPassword;
