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
        password.type = (password.type === "password") ? password.type = "text" : password.type = "password";
    }

    changeUserType = (event) => {
        this.setState({userType: event.target.value});
    }
    
    componentDidMount() {
        const path = window.location.pathname.split('/');

        if (path.length === 3) {
            if (path[2] === "site-manager") {
                this.setState( { userType: path[2] } )
                document.getElementById("siteManager").checked = true;
            }
            else if (path[2] === "data-entry") {
                this.setState( { userType: path[2] } )
                document.getElementById("dataEntry").checked = true;
            }
            else if (path[2] === "volunteer") {
                this.setState( { userType: path[2] } )
                document.getElementById("volunteerID").checked = true;
            }
        }
    }

    render() {
        console.log(this.state.userType)
        return (
            <div className="login-form">
                <h1>
                    {window.location.pathname.split('/')[2] === "site-manager" ? "Site Manager " : ""} 
                    {window.location.pathname.split('/')[2] === "data-entry" ? "Data Entry " : ""}
                    {window.location.pathname.split('/')[2] === "volunteer" ? "Volunteer " : ""}
                    Login
                </h1>
                <div id="cta-type">
                    <div id="site-manager">
                        <input type="radio" id="siteManager" name="cta" value="siteManager" onChange={this.changeUserType} checked={null}/>
                        <label for="siteManager">Manager</label>
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
