import React, { Component } from 'react';
import '../css/Profile.css';

class Profile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            firstName: "Jane",
            lastName: "Doe",
            email: "jdoe@email.com",
            site: "SLO",
            phoneNumber: "1112223333",
            availability: {
                M: true, 
                T: true, 
                W: false, 
                Th: false, 
                F: true
            }
        };
    }

    handleChange = (e) => {
        this.setState({ [e.target.id]: e.target.value });
    };

    edit = () => {
        var button = document.getElementById("changes-button");
        if (button.innerHTML == 'EDIT PROFILE') 
            button.innerHTML = 'SAVE CHANGES'
        else
            button.innerHTML = 'EDIT PROFILE'
    }

    render() {
        const headers = ['First Name: ', 'Last Name: ', 'Site: ', 'Email: ', 'Phone Number: ', 'Availability: '];
        var editable = false;
        return (
            <div className='profile-container'>
                <h1>{this.state.firstName} {this.state.lastName}'s Profile</h1>
                <div id='profile-info'>
                    <div id='profile-text-fields'>
                        <h2>First Name:</h2>
                        <h2>Last Name:</h2>
                        <h2>Site:</h2>
                        <h2>Email:</h2>
                        <h2>Phone Number:</h2>
                        <h2>Availability:</h2>
                    </div>
                    <div id='profile-editable-fields'>
                        {Object.keys(this.state).map(prop =>
                            <input type="text" id={prop} size="50" style={{width: '500px'}} value={
                                (prop == "availability") ? Object.keys(this.state.availability).map(day => (this.state.availability[day] == true) ? day : "") : this.state[prop]
                            } onChange={this.handleChange} readOnly/>
                        )}
                    </div>
                </div>
                <button id="changes-button" type="submit" onClick={this.edit}>EDIT PROFILE</button>
            </div>
        ); 
    }
}

export default Profile;
