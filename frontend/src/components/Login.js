import React, { Component } from 'react';
import '../css/Login.css';

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = { isLoggedIn : false };
    }

    isNotLoggedIn = () => {
        this.setState( { isLoggedIn : false } );
    }

    isLoggedIn = () => {
        this.setState( { isLoggedIn : true } );
    }

    passwordVisibility = () => {
        var password = document.getElementById("password");
        if (password.type === "password") {
            password.type = "text";
        } else {
            password.type = "password";
        }
    }

    render() {
        return (
            <div>
                <h2>Login</h2>
                <input type="text" id="email" placeholder="Email" size="50"/>
                <br/>
                <input type="password" id="password" placeholder="Password" size="50"/>
                <br/>
                <label class="password-security">
                    <input type="checkbox" id="password-visibility" onClick={() => this.passwordVisibility()}/>
                    Show Password
                </label>
                <br/>
                <button id="signin-button">Log In</button>
            </div>
        );
    }
}

export default Login;