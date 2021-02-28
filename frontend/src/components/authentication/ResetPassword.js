import React, { Component } from 'react';
import '../../css/ResetPassword.css';
import '../../css/Login.css';
import fire from '../../fire.js';

class ResetPassword extends Component{
	constructor(props){
		super(props);
		this.state = { };
	}

	firebase_reset_password = () => {
		var auth = fire.auth();
		var emailAddress = "user@example.com";

		auth.sendPasswordResetEmail(emailAddress).then(function() {
			// Email sent.
		}).catch(function(error) {
			// An error happened.
		});
	}

	render(){
		return(
			<div className='auth-form'>
				<h2> Reset Password </h2>
				<br/>
				<p> Please input your email below. You will be sent a link to reset your password. </p>
				<br/>
				<input type="email" id="email" size="50" style={{width: '500px'}}/>
			</div>
		)
	}
}


export default ResetPassword;
