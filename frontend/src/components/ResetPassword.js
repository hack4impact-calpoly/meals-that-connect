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
				<p> hello </p>
				<input type="text" id="email" placeholder="Email" size="50"/>
			</div>
		)
	}
}


export default ResetPassword;
