import React, { Component } from 'react';
import '../css/Signup.css';

class Signup extends Component {

    constructor(props) {
        super(props);
        this.state = { isVolunteer: false };
    }
    
    isNotVolunteer = () => {
        this.setState({isVolunteer: false});
    }

    isVolunteer = () => {
        console.log("nice");
        this.setState({isVolunteer: true});
    }

    render() {
        return (
            <div>
                <main>
                    <h2>Sign up</h2>
                    <div id="cta-type">
                        <input type="radio" id="manager" name="cta" value="manager" onChange={this.isNotVolunteer}/>
                        <label for="manager">Manager</label>
                        <input type="radio" id="data-entry" name="cta" value="data-entry" onChange={this.isNotVolunteer}/>
                        <label for="data-entry">Data Entry</label>
                        <input type="radio" id="volunteer" name="cta" value="volunteer" onChange={this.isVolunteer}/>
                        <label for="volunteer">Volunteer</label>
                    </div>
                    <input type="text" id="first-name" placeholder="First Name" size="22"/> <input type="text" id="last-name" placeholder="Last Name" size="22"/>
                    <br/>
                    <input type="text" id="email" placeholder="Email ex: example@gmail.com" size="50"/>
                    <br/>
                    <input type="password" id="email" placeholder="Password" size="50"/>
                    <br/>
                    <input type="password" id="email" placeholder="Confirm Password" size="50"/>
                    <br/>
                    <section>
                        {this.state.isVolunteer === true &&
                            <div id="volunteer-type">
                                <input type="radio" id="driver" name="volunteer" value="driver"/>
                                <label for="driver">Driver</label>
                                <input type="radio" id="other" name="volunteer" value="other"/>
                                <label for="other">Other/Cook</label>
                            </div>
                        }
                    </section>
                    <button id="signup-button">Sign up</button>
                </main>
            </div>
        );
    }
}

export default Signup;