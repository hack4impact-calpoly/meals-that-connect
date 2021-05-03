import React, { Component } from 'react';
import '../../css/Signup.css';
import env from "react-dotenv";
import { Route, Redirect, Link, withRouter } from 'react-router-dom';
import fire from '../../fire.js';

class Signup extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            userType: "",
            passwordValidated: true,
            isAuthenticated: false,
            personalData: { //shared across all users
                firstName: "",
                lastName: "",
                email: "",
                password: "",
                site: "SLO"
            },
            volunteerData: { //volunteers only
                driver: false,
                kitchenStaff: false,
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

    changeUserType = (event) => {
        this.setState({userType: event.target.value, emptyUser: false});
    }

    changeVolunteerType = (event) => {
        let volunteerData = this.state.volunteerData;
        if (event.target.value === "driver") {
            volunteerData["driver"] = !volunteerData["driver"];
        }
        else {
            volunteerData["kitchenStaff"] = !volunteerData["kitchenStaff"];
        }
        this.setState({volunteerData: volunteerData});
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

    signup = (e) => {
        e.preventDefault()
        if (this.state.passwordValidated === true) {
            let userType = this.state.userType;
            if (userType === "site-manager" || userType === "data-entry" || userType === "volunteer"){
                this.firebase_signup(this.state.email, this.state.password);
            }
            else {
                this.setState({emptyUser: true});
            }
        }
    }

    firebase_signup = () => {
        let {email, password} = this.state.personalData
        // console.log(email + " " + password)
        fire.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in 
            var user = userCredential.user;
            // Send verification email
            this.firebase_sendVerification(user);
            // Add user to MongoDB
            this.addUser();

        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            if (errorCode == 'auth/email-already-in-use') {
                alert('That email is taken. Try another.');
              } else {
                alert(errorMessage);
              }
              console.log(error);
        });
    }

    firebase_sendVerification = (user) => {

        user.sendEmailVerification().then(function() {
            // Email sent.
        }).catch(function(error) {
            // An error happened.
            var errorMessage = error.message;
            alert(errorMessage);
            console.log(error);
        });
    }

    addUser = () => {
        if (this.state.passwordValidated === true) {
            if (this.state.userType === "site-manager") {
                this.addSiteManager(this.state.personalData);
            }
            else if (this.state.userType === "data-entry") {
                this.addDataEntry(this.state.personalData);
            }
            else if (this.state.userType === "volunteer") {
                this.addVolunteer(this.state.personalData, this.state.volunteerData);
            }
            else {
                this.setState({emptyUser: true})
            }
        }
    }

    addSiteManager = (personalData) => {
        const newSiteManager = {
            firstName: personalData["firstName"],
            lastName: personalData["lastName"],
            email: personalData["email"],
            password: personalData["password"],
            isAuthenticated: this.state.isAuthenticated,
            site: personalData["site"],
            user: "site-manager"
        }

        this.mongo_signup(newSiteManager)
    }

    addDataEntry = (personalData) => {
        const newDataEntry = {
            firstName: personalData["firstName"],
            lastName: personalData["lastName"],
            email: personalData["email"],
            password: personalData["password"],
            isAuthenticated: this.state.isAuthenticated,
            site: personalData["site"],
            user: "data-entry"
        }

        this.mongo_signup(newDataEntry)
    }

    addVolunteer = (personalData, volunteerData) => {
        const newVolunteer = {
            firstName: personalData["firstName"],
            lastName: personalData["lastName"],
            email: personalData["email"],
            password: personalData["password"],
            site: personalData["site"],
            driver: volunteerData["driver"],
            kitchenStaff: volunteerData["kitchenStaff"],
            isAuthenticated_driver: volunteerData["isAuthenticated_driver"],
            isAuthenticated_kitchenStaff: volunteerData["isAuthenticated_kitchenStaff"],
            user: "volunteer",

            phoneNumber: "0",
            availability: {"M": false, "T": false, "W": false, "Th": false, "F": false},
        
        }
        this.mongo_signup(newVolunteer)
    }
    
    mongo_signup = (user) => {
        let _this = this
        fetch(env.backendURL + 'signup', {
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
                _this.props.history.push("/email-verification");
            }
        })
    }

    render() {
        return (
            <div className="auth-form">
                <h1 id="title">SIGN UP</h1>
                <form onSubmit={this.signup}>
                <div id="cta-type">
                    <div id="site-manager">
                        <input type="radio" id="siteManager" name="cta" value="site-manager" onChange={this.changeUserType} checked={null}/>
                        <label for="siteManager">Manager</label>
                    </div>
                    <div id="data-entry">
                        <input type="radio" id="dataEntry" name="cta" value="data-entry" onChange={this.changeUserType} checked={null}/>
                        <label for="dataEntry">Data Entry</label>
                    </div>
                    <div id="volunteer">
                        <input type="radio" id="volunteerID" name="cta" value="volunteer" onChange={this.changeUserType} checked={null}/>
                        <label for="volunteerID">Volunteer</label>
                    </div>
                </div>

                <div className= "drop-down-site">
                    <p id= "select-site">Select site:</p>
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
                <section>
                    {this.state.passwordValidated === false &&
                        <div>
                            <p id="error">Confirm password does not match password!</p>
                        </div>
                    }
                </section>
                <section> 
                    {this.state.userType === "volunteer" &&
                        <div className="volunteer-type">
                            <p>Choose which type(s) of volunteer you are:</p>
                            <div className = "volunteer-text">
                            <input type="checkbox" id="driver" name="volunteer" value="driver" onChange={this.changeVolunteerType}/>
                            <label for="driver" id="driver-text">Driver</label>
                            <input type="checkbox" id="kitchen" name="volunteer" value="kitchen" onChange={this.changeVolunteerType}/>
                            <label for="kitchen" id= "kitchen-text">Kitchen Volunteer</label>
                            </div>
                        </div>
                    }
                </section>
                {this.state.emptyUser && <div className="signup-error">Select the type of user</div>}
                {this.state.error && <div className="signup-error">Email taken</div>}
                <input id = "signup-button" type="submit" value="CREATE ACCOUNT"/>
                <p>Already have an account? <Link to="/login">Log in</Link></p>
                </form>
            </div>
        );
    }
}

export default withRouter(Signup);
