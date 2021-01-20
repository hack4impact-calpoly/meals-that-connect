import React, { Component } from 'react';
import '../css/Signup.css';

class Signup extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            userType: "",
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
            }
         };
    }
    
    // updates personal data
    handleChange = (event) => {
        let personalData = this.state.personalData;
        personalData[event.target.id] = event.target.value;

        this.setState({personalData: personalData});
    }

    changeUserType = (event) => {
        this.setState({userType: event.target.value});
    }

    changeVolunteerType = (event) => {
        let volunteerData = this.state.volunteerData;
        if (event.target.value === "driver") {
            volunteerData["driver"] = true;
            volunteerData["kitchenStaff"] = false;
        }
        else {
            volunteerData["driver"] = false;
            volunteerData["kitchenStaff"] = true;
        }
        this.setState({volunteerData: volunteerData});
    }

    addUser = (event) => {
        if (this.state.userType === "siteManager") {
            this.addSiteManager(this.state.personalData);
        }
        else if (this.state.userType === "data-entry") {
            this.addDataEntry(this.state.personalData);
        }
        else {
            this.addVolunteer(this.state.personalData, this.state.volunteerData);
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
            site: personalData["site"]
        }

        this.postUserData(newSiteManager);
    }

    addDataEntry = (personalData) => {
        const newDataEntry = {
            firstName: personalData["firstName"],
            lastName: personalData["lastName"],
            email: personalData["email"],
            password: personalData["password"],
            isAuthenticated: this.state.isAuthenticated,
            site: personalData["site"]
        }

        this.postUserData(newDataEntry);
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
        }

        this.postUserData(newVolunteer);
    }

    postUserData = (userData) => {
        fetch('nice.com', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        })
    }

    render() {
        return (
            <div>
                <main className="signup-form">
                    <h2>Sign up</h2>
                    <form onSubmit={this.addUser}>
                        <div id="cta-type">
                            <input type="radio" id="siteManager" name="cta" value="siteManager" onChange={this.changeUserType}/>
                            <label for="siteManager">Manager</label>
                            <input type="radio" id="data-entry" name="cta" value="data-entry" onChange={this.changeUserType}/>
                            <label for="data-entry">Data Entry</label>
                            <input type="radio" id="volunteer" name="cta" value="volunteer" onChange={this.changeUserType}/>
                            <label for="volunteer">Volunteer</label>
                        </div>
                        <input type="text" id="firstName" placeholder="First Name" onChange={this.handleChange} size="22" required/> <input type="text" id="lastName" placeholder="Last Name" onChange={this.handleChange} size="22" required/>
                        <br/>
                        <input type="email" id="email" placeholder="Email ex: example@gmail.com" onChange={this.handleChange} size="50" required/>
                        <br/>
                        <label for="password">Password: <br/>(Must contain at least one <br/>number, one uppercase, and one <br/>lowercase letter, and at least 6 or <br/>more characters long)</label>
                        <br/>
                        <input type="password" id="password" placeholder="Password" onChange={this.handleChange} 
                            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}" title="Must contain at least one number, one uppercase, and one lowercase letter, and at least 6 or more characters long"
                            size="50" required/>
                        <br/>
                        <input type="password" id="password-confirm" placeholder="Confirm Password" size="50" required/>
                        <br/>
                        {/* I have no idea why selecting volunteer and having this section conditionally render
                            causes the first set of radio buttons to move left slightly, will investigate later!*/}
                        <section> 
                            {this.state.userType === "volunteer" &&
                                <div id="volunteer-type">
                                    <input type="radio" id="driver" name="volunteer" value="driver" onChange={this.changeVolunteerType}/>
                                    <label for="driver">Driver</label>
                                    <input type="radio" id="kitchen" name="volunteer" value="kitchen" onChange={this.changeVolunteerType}/>
                                    <label for="kitchen">Kitchen Volunteer</label>
                                </div>
                            }
                        </section>
                        <input type="submit" value="Sign Up"/>
                    </form>
                </main>
            </div>
        );
    }
}

export default Signup;