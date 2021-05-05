import React, { Component } from 'react';
import '../css/Profile.css';
import env from "react-dotenv";
import { signout } from './authentication/authenticationUtils';
import fire from './../fire.js';
import { Redirect } from 'react-router-dom';

class Profile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            site: '',
            phoneNumber: '',
            availability: {
                M: '', 
                T: '', 
                W: '', 
                Th: '', 
                F: ''
            },
            notes: '',
            userType: localStorage.getItem('userType'),
            readOnly: true,
            hideCancel: true,
            RedirectLoggedUser: false
        };
    }

    handleChange = (e) => {
        this.setState({ [e.target.id]: e.target.value });
    };

    async componentDidMount() {
        this.fetchUserData()
    };

    async fetchUserData () {
        let email = localStorage.getItem('email')
        let type
        let info = {
            email: email
        }

        if (this.state.userType == 'site-manager') type = 'siteManager'
        else if (this.state.userType == 'volunter') type = 'volunteer'
        else type = 'dataEntry'

        let response = await fetch(process.env.REACT_APP_SERVER_URL + 'profile/' + type, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(info)
        })
        const data = await response.json();
        console.log(data)
        this.setState( { 
            firstName: data.firstName,
            lastName: data.lastName,
            site: data.site,
            phoneNumber: data.phoneNumber,
            availability: data.availability
        } )
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
    };

    cancel = () => {
        var edit = document.getElementById("changes-button");
        edit.innerHTML = 'EDIT PROFILE';
        this.setState( { readOnly: true, hideCancel: true } ); 
        window.location.reload(false);
    };

    updateProfile = (profile) => {
		let _this = this
        let type

        if (this.state.userType == 'site-manager') type = 'SiteManager'
        else if (this.state.userType == 'volunter') type = 'Volunteer'
        else type = 'DataEntry'

        fetch(env.backendURL + 'profile/update' + type + 'Profile', {
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
	};

    signOut = () => {
		signout()
        this.setState({ RedirectLoggedUser: true });
        fire.auth().signOut().then(() => {
            window.location.reload(false);
            // Sign-out successful.
        }).catch((error) => {
            // An error happened.
            console.log(error);
        });
	}

    render() {
        const { RedirectLoggedUser } = this.state;

        // if user has signed in redirect to private page
        if (RedirectLoggedUser === true) {
          return (
            <Redirect to='/' />
          )
        }

        return (
            <div className='profile-container'>
                <h1>{this.state.firstName.toUpperCase()} {this.state.lastName.toUpperCase()}'S PROFILE</h1>
                <div id='profile-editable-fields'>
                    <p className='input-firstName'>First Name</p>
                    <input type="text" id={this.state.firstName} size="50" style={{width: '720px'}} defaultValue={this.state.firstName} onChange={this.handleChange} readOnly={this.state.readOnly}/>
                    <p className='input-lastName'>Last Name</p>
                    <input type="text" id={this.state.lastName} size="50" style={{width: '720px'}} defaultValue={this.state.lastName} onChange={this.handleChange} readOnly={this.state.readOnly}/>
                    <p className='input-Email'>Email</p>
                    <input type="text" id={this.state.email} size="50" style={{width: '720px'}} defaultValue={this.state.email} onChange={this.handleChange} readOnly/>
                    <p className='input-site'>Site</p>
                    <input type="text" id={this.state.site} size="50" style={{width: '720px'}} defaultValue={this.state.site} onChange={this.handleChange} readOnly/>
                    <p className='input-phoneNumber' hidden={(this.state.userType == 'volunteer') ? false : true}>Phone Number</p>
                    <input type="text" id={this.state.phoneNumber} size="50" style={{width: '720px'}} defaultValue={this.state.phoneNumber} onChange={this.handleChange} readOnly={this.state.readOnly} hidden={(this.state.userType == 'volunteer') ? false : true}/>
                    <p className='input-availability' hidden={(this.state.userType == 'volunteer') ? false : true}>Availability</p>
                    <table style={{marginTop: "10px", marginLeft: "auto", marginRight: "auto"}} className="availability-table" hidden={(this.state.userType == 'volunteer') ? false : true}>
                        <tr>
                            <th><label for="volunteer-m">Monday</label></th>
                            <th><label for="volunteer-t">Tuesday</label></th>
                            <th><label for="volunteer-w">Wednesday</label></th>
                            <th><label for="volunteer-th">Thursday</label></th>
                            <th><label for="volunteer-f">Friday</label></th>
                        </tr>
                        <tr>
                            <td><input type="checkbox" id="volunteer-m" onChange={e => this.setState(prevState => ({availability: {...prevState.availability, M: !prevState.availability.M}}))} readOnly={this.state.readOnly}/></td>
                            <td><input type="checkbox" id="volunteer-t" onChange={e => this.setState(prevState => ({availability: {...prevState.availability, T: !prevState.availability.T}}))} readOnly={this.state.readOnly}/></td>
                            <td><input type="checkbox" id="volunteer-w" onChange={e => this.setState(prevState => ({availability: {...prevState.availability, W: !prevState.availability.W}}))} readOnly={this.state.readOnly}/></td>
                            <td><input type="checkbox" id="volunteer-th" onChange={e => this.setState(prevState => ({availability: {...prevState.availability, Th: !prevState.availability.Th}}))} readOnly={this.state.readOnly}/></td>
                            <td><input type="checkbox" id="volunteer-f" onChange={e => this.setState(prevState => ({availability: {...prevState.availability, F: !prevState.availability.F}}))} readOnly={this.state.readOnly}/></td>
                        </tr>
                    </table>
                    <p className='input-notes' hidden={(this.state.userType == 'volunteer') ? false : true}>Notes</p>
                    <textarea type="text" id="notes" onChange={e => this.setState({notes: e.target.value})} size="50" style={{"width": "720px"}} readOnly={this.state.readOnly} hidden={(this.state.userType == 'volunteer') ? false : true}/>
                </div>
                <div id='buttons'>
                    <button id="changes-button" type="submit" onClick={this.edit}>EDIT PROFILE</button>
                    <button id="signout-button" type="submit" onClick={this.signOut} hidden={!this.state.hideCancel}>SIGN OUT</button>
                    <button id="cancel-button" type="submit" hidden={this.state.hideCancel} onClick={this.cancel}>CANCEL</button>
                </div>
            </div>
        ); 
    }
}

export default Profile;