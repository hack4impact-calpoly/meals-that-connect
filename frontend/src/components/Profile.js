import React, { Component } from 'react';
import '../css/Profile.css';
import env from "react-dotenv";

class Profile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            profile: {
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
            },
            userType: "site-manager",
            readOnly: true,
            hideCancel: true
        };
    }

    handleChange = (e) => {
        this.setState({ [e.target.id]: e.target.value });
    };

    edit = () => {
        var button = document.getElementById("changes-button");
        if (button.innerHTML == 'EDIT PROFILE') {
            button.innerHTML = 'SAVE CHANGES';
            this.setState( { readOnly: false, hideCancel: false } );   
            this.updateProfile(this.state.profile);
        }
        else {
            button.innerHTML = 'EDIT PROFILE';
            this.setState( { readOnly: true, hideCancel: true } );
        }
    }

    cancel = () => {
        var edit = document.getElementById("changes-button");
        edit.innerHTML = 'EDIT PROFILE';
        this.setState( { readOnly: true, hideCancel: true } ); 
        window.location.reload(false);
    }

    updateProfile = (profile) => {
		let _this = this
        fetch(env.backendURL + 'profile/' + this.state.userType + 'Profile', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(profile)
        })
        .then((res) => {
            if (res.status === 404) {
                _this.setState({error: true})
            }
            else {
                _this.props.history.push("/");
            }
        })
	}

    render() {
        return (
            <div className='profile-container'>
                <h2>{this.state.profile.firstName} {this.state.profile.lastName}'s Profile</h2>
                <div id='profile-info'>
                    <div id='profile-text-fields'>
                        <h2>First Name:</h2>
                        <h2>Last Name:</h2>
                        <h2>Site:</h2>
                        <h2>Email:</h2>
                        { (this.state.userType != 'volunteer') ? <h2>Phone Number:</h2> : ''}
                        { (this.state.userType != 'volunteer') ? <h2>Availability:</h2> : ''}
                    </div>
                    <div id='profile-editable-fields'>
                        {Object.keys(this.state.profile).map(prop =>
                            (prop != 'email') ?
                            <input type="text" id={prop} size="50" style={{width: '500px'}} defaultValue={
                                (prop == "availability") ? Object.keys(this.state.profile.availability).map(day => (this.state.profile.availability[day] == true) ? day : null).join('') : this.state.profile[prop]
                            } onChange={this.handleChange} readOnly={this.state.readOnly}/>
                            : <input type="text" id={prop} size="50" style={{width: '500px'}} defaultValue={this.state.profile[prop]} onChange={this.handleChange} readOnly/>
                        )}
                    </div>
                </div>
                <div id='buttons'>
                    <button id="changes-button" type="submit" onClick={this.edit}>EDIT PROFILE</button>
                    <button id="cancel-button" type="submit" hidden={this.state.hideCancel} onClick={this.cancel}>CANCEL</button>
                </div>
            </div>
        ); 
    }
}

export default Profile;
