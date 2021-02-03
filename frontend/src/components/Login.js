import React, { Component } from 'react';
import env from "react-dotenv";
import '../css/Login.css';
import { withRouter } from "react-router-dom";

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            isLoggedIn : false,
            email: "",
            password: "",
            userType: this.props.match.params.user ? this.props.match.params.user : "",
            error: false
        };
    }

    handleChange = (e) => {
        this.setState({ [e.target.id]: e.target.value });
    };

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

    login = () => {
        let _this = this
        const user = {
            email: this.state.email,
            password: this.state.password,
            user: this.state.userType
        }

        fetch(env.backendURL + 'login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        .then((res) => {
            if (res.status === 404) {
                _this.setState({error: true})
            }
            else {
                _this.props.history.push("/manager-overview");
            }
        })
    }

    render() {
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
                <input type="text" id="email" placeholder="Email" size="50" style={{width: '500px'}} onChange={this.handleChange}/>
                <br/>
                <input type="password" id="password" placeholder="Password" size="50" style={{width: '500px'}} onChange={this.handleChange}/>
                <br/>
                <label class="password-security">
                    <input type="checkbox" id="password-visibility" onClick={() => this.passwordVisibility()}/>
                    Show Password
                </label>
                <br/>
                {this.state.error && <div className="error">Invalid email or password</div>}
                <button id="signin-button" onClick={this.login}>Log In</button>
            </div>
        );
    }
}

export default withRouter(Login);
