import React, { Component } from 'react';
import '../../css/Signup.css';
import { Route, Redirect, Link, withRouter } from 'react-router-dom';
import fire from '../../fire.js';

class Signup extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            userType: "volunteer",
            passwordValidated: true,
            isAuthenticated: false,
            personalData: { //shared across all users
                code: "",
                firstName: "",
                lastName: "",
                email: "",
                password: "",
                site: "SLO"
            },
            volunteerData: { //volunteers only
                driver: true,
                kitchenStaff: true,
                isAuthenticated_driver: false,
                isAuthenticated_kitchenStaff: false,
            },
            emptyUser: false
         };
    }

    // updates personal data
    handleChange = (event) => {
        let personalData = this.state.personalData;
        personalData[event.target.id] = event.target.value;

        this.setState({personalData: personalData});
    }

    validatePassword = (event) => {
        const confirmPassword = event.target.value;
        const password = this.state.personalData["password"];
        if (password !== confirmPassword) {
            this.setState({passwordValidated: false});
        }
        else {
            this.setState({passwordValidated: true});
        }
    }

    validAdminCode = () => {
        const adminCode = this.state.personalData["code"];
        if (adminCode !== process.env.REACT_APP_ADMIN_CODE) {
            this.setState({error: true, errorMessage: "Invalid admin code"});
            return false
        }
        else {
            this.setState({error: false});
            return true
        }
    }

    signup = (e) => {
        e.preventDefault()
        if (this.state.passwordValidated === true) {
            if (this.validAdminCode()) {
                this.firebase_signup(this.state.email, this.state.password);
            }
        }
    }

    firebase_signup = () => {
        let _this = this
        let {email, password} = this.state.personalData
        fire.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            var user = userCredential.user;
            this.firebase_sendVerification(user);
            this.addAdminUser(_this.state.personalData, _this.state.volunteerData);

        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            if (errorCode === 'auth/email-already-in-use') {
                alert('That email is taken. Try another.');
              } else {
                alert(errorMessage);
              }
              console.log(error);
        });
    }

    firebase_sendVerification = (user) => {
        user.sendEmailVerification().then(function(){})
        .catch(function(error) {
            var errorMessage = error.message;
            alert(errorMessage);
            console.log(error);
        });
    }

    addAdminUser = async (personalData, volunteerData) => {
        let newAdminUser
        let userTypes = ["site-manager", "volunteer", "data-entry"]
        for (let i = 0; i < 3; i++) {
            let userType = userTypes[i]
            newAdminUser = {
                firstName: personalData["firstName"],
                lastName: personalData["lastName"],
                email: personalData["email"],
                password: personalData["password"],
                site: personalData["site"],
                driver: volunteerData["driver"],
                kitchenStaff: volunteerData["kitchenStaff"],
                isAuthenticated_driver: volunteerData["isAuthenticated_driver"],
                isAuthenticated_kitchenStaff: volunteerData["isAuthenticated_kitchenStaff"],
                user: userType,
                code: personalData.code,
                phoneNumber: "0",
                availability: {"M": false, "T": false, "W": false, "Th": false, "F": false},
                admin: true,
            }

            let success = await this.mongo_signup(newAdminUser)
            if (!success) {
                this.setState({error: true, errorMessage: "Email already in use"});
                return false;
            }
        }

        this.props.history.push("/email-verification");
    }


    
    mongo_signup = async (user) => {

        let response = await fetch(process.env.REACT_APP_SERVER_URL + 'signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        const msg = await response.text();
        if (msg === "success") {
            return true
        }
        else {
            return false
        }
    }

    render() {
        return (
            <div className="auth-form">
                <h1 id="title">ADMIN SIGN UP</h1>
                <form onSubmit={this.signup}>

                <div className= "drop-down-site">
                    <p id= "select-site">Select default site:</p>
                    <select style={{width: '150px'}} id= "site" value={this.state.value} onChange={this.handleChange}>
                        <option value="SLO">SLO</option>
                        <option value="Five cities">Five cities</option>
                        <option value="Cambria">Cambria</option>
                    </select>
                </div>

                <div className= "input-name">
                    <p id="first-name">First Name</p>
                    <p id="last-name">Last Name</p>
                </div>
                <div id="cta-type" style={{marginBottom: "0px"}}>
                    <input type="text" id="firstName" className="user-name" style={{width: '245px'}} onChange={this.handleChange} size="25" required/>
                    <input type="text" id="lastName"  className="user-name" style={{width: '245px'}} onChange={this.handleChange} size="25" required/>
                </div>
                <p id = "input">Email</p>
                <input type="email" className="account-info" id="email" size="50" style={{width: '500px'}} onChange={this.handleChange} required/>
                <p id = "input">Password</p>
                <input type="password" className="account-info" id="password" style={{width: '500px'}} onChange={this.handleChange} 
                    pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}" title="Must contain at least one number, one uppercase, and one lowercase letter, and at least 6 or more characters long"
                    size="50" required/>
                <br/>
                <label id="pass-label" for="password">(Must contain at least one number, one uppercase, and one lowercase <br/>letter, and at least 6 or more characters long)</label>
                <p id = "input">Confirm Password</p>
                <input type="password" className="account-info" id="password-confirm" size="50" style={{width: '500px'}} onChange={this.validatePassword}  required/>
                <br/>
                <p id = "input">Admin Code</p>
                <input type="text" className="account-info" id="code" size="50" style={{width: '500px'}} onChange={this.handleChange}  required/>
                <br/>
                <section>
                    {this.state.passwordValidated === false &&
                        <div>
                            <p id="error">Confirm password does not match password!</p>
                        </div>
                    }
                </section>
                {this.state.emptyUser && <div className="signup-error">Select the type of user</div>}
                {this.state.error && <div className="signup-error">{this.state.errorMessage}</div>}
                <input id = "signup-button" type="submit" value="CREATE ACCOUNT"/>
                </form>
            </div>
        );
    }
}

export default withRouter(Signup);
