import React, { Component } from 'react';
import '../css/ResetPassword.css';

class ResetPassword extends Component{
	constructor(props){
		super(props);
		this.state = { };
	}

	render(){
		return(
			<div className='ResetPassword'>
				<h2> ResetPassword </h2>
				<p> Input your email below to reset your password. </p>
				<input type="text" id="email" placeholder="Email" size="50"/>
				<br/>
				<button id='reset-pwd-button'> Send Reset Link </button>
			</div>
		)
	}
}


export default ResetPassword;
