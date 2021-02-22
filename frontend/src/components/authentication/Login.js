import React, { Component } from 'react';
import '../../css/Login.css';
import { Route, Redirect, Link, withRouter } from 'react-router-dom';
import env from "react-dotenv";
import fire from '../../fire.js';

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            isLoggedIn : false,
            RedirectLoggedUser: false,
            userType: this.props.match.params.user ? this.props.match.params.user : "",
            emptyUser: false,
            email: "",
            password: "",
            error: false
        };
    }

    storeUser = () => {
        const date = new Date();
        localStorage.setItem("userEmail", this.state.email);
        localStorage.setItem("userType", this.state.userType);
        localStorage.setItem("site", "SLO");
        localStorage.setItem("time", date);
        localStorage.setItem("isLoggedIn", true);
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
        this.setState({userType: event.target.value, emptyUser: false});
    }
    
    componentDidMount() {
        const path = window.location.pathname.split('/');

        if (path.length === 3) {
            if (path[2] === "site-manager") {
                this.setState( { userType: path[2] } )
                document.getElementById("site-manager").checked = true;
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

    firebase_signin = (email, password) => {
        fire.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in
            var user = userCredential.user;
            // ...
            this.firebase_checkEmailVerif(user);
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            alert(errorMessage);
            console.log(error)
        });
        }

    firebase_checkEmailVerif = (user) => {
        var user = fire.auth().user;
        var uid, emailVerified;

        if (user != null) {
        emailVerified = user.emailVerified;
        
        if (!emailVerified) {
            this.props.history.push("/email-verification");
        } 
        else {
            if (this.state.userType === "volunteer"){
                this.volunteerInfoCheck(user)
            }
            else {
                this.props.history.push("/");
            }
        }

        // uid = user.uid;  
        // The user's ID, unique to the Firebase project. Do NOT use
        // this value to authenticate with your backend server, if
        // you have one. Use User.getToken() instead.
}
    }

    volunteerInfoCheck = (user) => {
        let _this = this
        fetch(env.backendURL + 'volunteers/volunteerComplete', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
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

    login = (e) => {
        e.preventDefault();
        let _this = this

        if (this.state.userType == "") {
            this.setState({emptyUser: true})
            return;
        }

        console.log(this.state.userType)

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
                console.log(res)
            }
            else {
                _this.storeUser()
                // this.firebase_signin(this.state.email, this.state.password);
                if (this.state.userType === "volunteer"){
                    this.volunteerInfoCheck(user)
                }
                else {
                    this.props.history.push("/");
                }
            }
        })
    }

    render() {
        const { RedirectLoggedUser } = this.state;

        // if user has signed in redirect to private page
        if (RedirectLoggedUser === true) {
          return (
            <Redirect to='/private' />
          )
        }

        return (
            <form className="auth-form" onSubmit={this.login}>
                <div className="title">
                        {window.location.pathname.split('/')[2] === "site-manager" ? "Site Manager " : ""} 
                        {window.location.pathname.split('/')[2] === "data-entry" ? "Data Entry " : ""}
                        {window.location.pathname.split('/')[2] === "volunteer" ? "Volunteer " : ""}
                    <h1>SIGN IN</h1>
                </div>
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
                <p className= "input-email">Email</p>
                <input type="text" id="email" size="50" style={{width: '500px'}} onChange={this.handleChange}/>
                <br/>
                <p className= "input-password">Password</p>
                <div className = "link">
                <Link to="/reset-password">Forgot Password?</Link>
                </div>
                <input type="password" id="password" size="50" style={{width: '500px'}} onChange={this.handleChange}/>
                <br/>
                <label class="password-security">
                    <input type="checkbox" id="password-visibility" onClick={() => this.passwordVisibility()}/>
                    Show Password
                </label>
                <br/>
                {this.state.emptyUser && <div className="error">Select the type of user</div>}
                {this.state.error && <div className="error">Invalid email or password</div>}
                <button id="login-button" type="submit">LOG IN</button>
                <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
            </form>
          )}
    }

export default withRouter(Login);
