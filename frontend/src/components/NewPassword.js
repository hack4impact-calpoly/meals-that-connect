import React, { Component } from 'react';
import '../css/NewPassword.css';

class NewPassword extends Component {
	constructor(props){
		super(props);
		this.state = 
		{ };
	}

	passwordVisibility = () => {
        var password1 = document.getElementById("password1");
        var password2 = document.getElementById("password2");
        if (password1.type === "password") {
            password1.type = "text";
        } else {
            password1.type = "password";
        }

        if (password2.type === "password") {
            password2.type = "text";
        } else {
            password2.type = "password";
        }
    }

	render(){
		return(
			<div className='NewPassword'>
				<h2> NewPassword</h2>
				hello
				<p> Input your new password below. Please verify both passwords match. </p>
				<input type="password" id="password1" placeholder="Enter new password" size="50"/>
                <br/>
                <input type="password" id="password2" placeholder="Re-enter new password" size="50"/>
                <br/>

                <label class="new-password-security">
                    <input type="checkbox" id="password-visibility" onClick={() => this.passwordVisibility()}/>
                    Show Password
                </label>

                <button id="new-pwd-button"> Update Password </button>
			</div>
		)
	}
}

export default NewPassword;