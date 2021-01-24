import React, { Component } from 'react';
import '../css/Login.css';
import '../css/Signup.css';

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            isLoggedIn : false,
            userType: this.props.match.params.user ? this.props.match.params.user : ""
        };
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

    changeUserType = (event) => {
        this.setState({userType: event.target.value});
    }

    render() {
        console.log(this.state.userType)
        return (
            <div className="login-form">
                <h2>Login</h2>
                <div id="cta-type">
                    <input type="radio" id="siteManager" name="cta" value="siteManager" onChange={this.changeUserType}/>
                    <label for="siteManager">Manager</label>
                    <input type="radio" id="data-entry" name="cta" value="data-entry" onChange={this.changeUserType}/>
                    <label for="data-entry">Data Entry</label>
                    <input type="radio" id="volunteer" name="cta" value="volunteer" onChange={this.changeUserType}/>
                    <label for="volunteer">Volunteer</label>
                </div>
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
