import React, { Component } from 'react';
import '../../css/Signup.css';
import env from "react-dotenv";
import { Route, Redirect, Link, withRouter } from 'react-router-dom';

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
                site: ""
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

    storeUser = () => {
        localStorage.setItem("userEmail", this.state.email);
        localStorage.setItem("userType", this.state.userType);
        localStorage.setItem("site", "SLO");
        localStorage.setItem("time", new Date());
        localStorage.setItem("isLoggedIn", true);
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

    addUser = (event) => {
        if (this.state.passwordValidated === true) {
            if (this.state.userType === "siteManager") {
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
        event.preventDefault(); //prevent the page from reloading, might remove later
    }

    addSiteManager = (personalData) => {
        const newSiteManager = {
            firstName: personalData["firstName"],
            lastName: personalData["lastName"],
            email: personalData["email"],
            password: personalData["password"],
            isAuthenticated: this.state.isAuthenticated,
            site: personalData["site"],
            user: "siteManager"
        }

        this.signup(newSiteManager)
    }

    addDataEntry = (personalData) => {
        const newDataEntry = {
            firstName: personalData["firstName"],
            lastName: personalData["lastName"],
            email: personalData["email"],
            password: personalData["password"],
            isAuthenticated: this.state.isAuthenticated,
            site: personalData["site"],
            user: "dataEntry"
        }

        this.signup(newDataEntry)
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
            user: "volunteer"
        }
        this.signup(newVolunteer)
    }

    
    signup = (user) => {
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
                _this.storeUser()
                _this.props.history.push("/sitemanager");
            }
        })
    }

    render() {
        return (
            <div>
                <main className="signup-form">
                    <h1 id="title">SIGN UP</h1>
                    <form onSubmit={this.addUser}>
                    <div id="cta-type">
                        <div id="site-manager">
                            <input type="radio" id="siteManager" name="cta" value="siteManager" onChange={this.changeUserType} checked={null}/>
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
                                <p id="pass-error">Confirm password does not match password!</p>
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
                </main>
            </div>
        );
    }
}

export default withRouter(Signup);