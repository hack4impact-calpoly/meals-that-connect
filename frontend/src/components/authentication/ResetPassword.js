import React, { Component } from 'react';
import '../../css/ResetPassword.css';
import '../../css/Login.css';

class ResetPassword extends Component{
	constructor(props){
		super(props);
		this.state = { };
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
