import React, { Component } from 'react';
import '../css/Signup.css';

class Signup extends Component {

    constructor(props) {
        super(props);
        this.state = { 
                      userType: "",
                      volunteerType: "",
                      personalData: {},
         };
    }
    
    handleChange = (event) => {
        let personalData = this.state.personalData;
        personalData[event.target.id] = event.target.value;

        this.setState({personalData: personalData});
        console.log(this.state)
    }

    changeUserType = (event) => {
        this.setState({userType: event.target.value});
    }

    changeVolunteerType = (event) => {
        this.setState({volunteerType: event.target.value});
    }

    addUser = (event) => {
        const newUser = { 
            userType: this.state.userType,
            personalData: this.state.personalData,
            volunteerType: this.state.volunteerType
        };
        event.preventDefault();
        console.log(newUser)
        fetch('nice.com', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newUser)
        })
        
    }

    render() {
        return (
            <div>
                <main className="signup-form">
                    <h2>Sign up</h2>
                    <form onSubmit={this.addUser}>
                        <div id="cta-type">
                            <input type="radio" id="manager" name="cta" value="manager" onChange={this.changeUserType}/>
                            <label for="manager">Manager</label>
                            <input type="radio" id="data-entry" name="cta" value="data-entry" onChange={this.changeUserType}/>
                            <label for="data-entry">Data Entry</label>
                            <input type="radio" id="volunteer" name="cta" value="volunteer" onChange={this.changeUserType}/>
                            <label for="volunteer">Volunteer</label>
                        </div>
                        <input type="text" id="first-name" placeholder="First Name" onChange={this.handleChange} size="22" required/> <input type="text" id="last-name" placeholder="Last Name" onChange={this.handleChange} size="22" required/>
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
                                    <input type="radio" id="other" name="volunteer" value="other" onChange={this.changeVolunteerType}/>
                                    <label for="other">Other/Cook</label>
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