import React, { Component } from 'react';
import '../css/Signup.css';

class Signup extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            userType: "",
            isAuthenticated: false,
            personalData: {
                firstName: "",
                lastName: "",
                email: "",
                password: "",
                site: ""
            },
            volunteerData: {
                driver: false,
                kitchenStaff: false,
                isAuthenticated_driver: false,
                isAuthenticated_kitchenStaff: false,
            }
         };
    }
    
    handleChange = (event) => {
        let personalData = this.state.personalData;
        personalData[event.target.id] = event.target.value;

        this.setState({personalData: personalData});
    }

    changeUserType = (event) => {
        this.setState({userType: event.target.value});
    }

    changeVolunteerType = (event) => {
        if (event.target.value === "driver") {
            this.setState({volunteerData: {
                driver: true,
                kitchenStaff: false
            }})
        }
        else {
            this.setState({volunteerData: {
                driver: false,
                kitchenStaff: true
            }})
        }
    }

    addUser = (event) => {
        if (this.state.userType === "siteManager") {
            this.addSiteManager(Object.values(this.state.personalData));
        }
        else if (this.state.userType === "data-entry") {
            this.addDataEntry(Object.values(this.state.personalData));
        }
        else {
            this.addVolunteer(Object.values(this.state.personalData), Object.values(this.state.volunteerData));
        }
        event.preventDefault();
    }

    addSiteManager = (personalData) => {
        const newSiteManager = {
            firstName: personalData[0],
            lastName: personalData[1],
            email: personalData[2],
            password: personalData[3],
            isAuthenticated: this.state.isAuthenticated,
            site: personalData[4]
        }

        console.log(newSiteManager);
        fetch('nice.com', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newSiteManager)
        })
    }

    addDataEntry = (personalData) => {
        const newDataEntry = {
            firstName: personalData[0],
            lastName: personalData[1],
            email: personalData[2],
            password: personalData[3],
            isAuthenticated: this.state.isAuthenticated,
            site: personalData[4]
        }

        console.log(newDataEntry);
        fetch('nice.com', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newDataEntry)
        })
    }

    addVolunteer = (personalData, volunteerData) => {
        const newDataEntry = {
            firstName: personalData[0],
            lastName: personalData[1],
            email: personalData[2],
            password: personalData[3],
            site: personalData[4],
            driver: volunteerData[0],
            kitchenStaff: volunteerData[1],
            isAuthenticated_driver: volunteerData[2],
            isAuthenticated_kitchenStaff: volunteerData[3],
        }

        console.log(newDataEntry);
        fetch('nice.com', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newDataEntry)
        })
    }

    render() {
        return (
            <div>
                <main className="signup-form">
                    <h2>Sign up</h2>
                    <form onSubmit={this.addUser}>
                        <div id="cta-type">
                            <input type="radio" id="siteManager" name="cta" value="manager" onChange={this.changeUserType}/>
                            <label for="manager">Manager</label>
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