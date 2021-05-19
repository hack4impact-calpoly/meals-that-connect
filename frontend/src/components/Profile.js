import React, { Component } from 'react';
import '../css/Profile.css';
import { signout } from './authentication/authenticationUtils';
import fire from './../fire.js';
import { Redirect } from 'react-router-dom';
import Select from 'react-select'

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
            driver: false,
            kitchenStaff: false,
            originalUser: localStorage.getItem('userType'),
            userType: localStorage.getItem('userType'),
            readOnly: true,
            hideCancel: true,
            RedirectLoggedUser: false,
            admin: false,
        };
    }

    handleChange = (e) => {
        this.setState({ [e.target.id]: e.target.value });
    };

    updateCheckbox = (e, day) => {
        if (!this.state.hideCancel) {
            this.state.availability[day] = (e.target.checked)
        }
    }

    updateType = (e) => {
        if (!this.state.hideCancel) {
            this.setState({ [e.target.id]: e.target.checked });
        }
        
    }

    async componentDidMount() {
        this.fetchUserData()
    }

    async fetchUserData () {
        let email = localStorage.getItem('userEmail')
        let type = this.state.userType
        let info = {
            email: email,
            userType: type
        }

        let response = await fetch(process.env.REACT_APP_SERVER_URL + 'profile', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(info)
        })
        const data = await response.json();
        
        if (type === "volunteer") {
            localStorage.setItem("volunteerID", data.volunteerID)
            this.setState( { 
                firstName: data.firstName,
                lastName: data.lastName,
                site: data.site,
                email: email,
                phoneNumber: data.phoneNumber,
                availability: data.availability,
                kitchenStaff: data.kitchenStaff,
                driver: data.driver,
                notes: data.notes,
                admin: data.admin,
            })
            
        }
        else {
            this.setState( { 
                firstName: data.firstName,
                lastName: data.lastName,
                site: data.site,
                admin: data.admin,
                email: email,
            })
        }
    }

    edit = () => {
        var button = document.getElementById("changes-button");
        if (button.innerHTML === 'EDIT PROFILE') {
            button.innerHTML = 'SAVE CHANGES';
            this.setState( { readOnly: false, hideCancel: false } );  
        }
        else {
            button.innerHTML = 'EDIT PROFILE';
            this.setState( { readOnly: true, hideCancel: true } ); 
            this.updateProfile();
        }
    };

    cancel = () => {
        var edit = document.getElementById("changes-button");
        edit.innerHTML = 'EDIT PROFILE';
        this.setState( { readOnly: true, hideCancel: true } ); 
        window.location.reload(false);
    };

    updateProfile = async () => {
		let _this = this

        let {firstName, lastName, phoneNumber, availability, userType, 
             email, driver, kitchenStaff, notes, originalUser} = this.state

        let profile = {
            email: email,
            userType: originalUser,
            firstName: firstName,
            lastName: lastName, 
            notes: notes,
            phoneNumber: phoneNumber,
            availability: availability,
            driver: driver,
            kitchenStaff: kitchenStaff
        }


        await fetch(process.env.REACT_APP_SERVER_URL + 'profile/update', {
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
                localStorage.setItem("userType", userType)
                window.location.reload()
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

    handleSelect = (e) => {
        this.setState({userType: e.value})
    }

    render() {
        const { RedirectLoggedUser } = this.state;

        // if user has signed in redirect to private page
        if (RedirectLoggedUser === true) {
          return (
            <Redirect to='/' />
          )
        }

        let { hideCancel, driver, kitchenStaff, notes, userType, admin } = this.state
        let { M, T, W, Th, F } = this.state.availability
        let options = [
            { value: 'site-manager', label: 'site-manager' },
            { value: 'data-entry', label: 'data-entry' },
            { value: 'volunteer', label: 'volunteer' }
        ]

        const customStyles = {
            option: (provided, state) => ({
              ...provided,
              fontSize: 24,
            }),
            control:(provided, state) => ({
                // none of react-select's styles are passed to <Control />
                ...provided,
                fontSize: 24,
                padding: '0px 10px',
                marginBottom: 10,
              }), 
              valueContainer:(provided, state) => ({
                // none of react-select's styles are passed to <Control />
                ...provided,
                padding: '0px 10px',
                margin: 0,
                height: 70,
              }), 
            singleValue: (provided, state) => {
              const opacity = state.isDisabled ? 0.5 : 1;
              const transition = 'opacity 300ms';
          
              return { ...provided, opacity, transition };
            }
          }
          

        return (
            <div className='profile-container'>
                <h1>{this.state.firstName.toUpperCase()} {this.state.lastName.toUpperCase()}{"'S PROFILE"}</h1>
                <div id='profile-editable-fields'>
                    {admin && 
                    <div style={{width: 300, marginLeft: userType === "volunteer" ? 130 : 0}}>
                        <p className='input-firstName'>User Type</p>
                        <Select 
                            isDisabled={this.state.readOnly}
                            options={options} 
                            placeholder="User Type" 
                            styles={customStyles}
                            defaultValue={{value: userType, label: userType}} 
                            onChange={this.handleSelect}/>
                    </div>}
                    <p className='input-firstName'>First Name</p>
                    <input type="text" id='firstName' size="50" style={{width: '720px'}} defaultValue={this.state.firstName} onChange={this.handleChange} readOnly={this.state.readOnly}/>
                    <p className='input-lastName'>Last Name</p>
                    <input type="text" id='lastName' size="50" style={{width: '720px'}} defaultValue={this.state.lastName} onChange={this.handleChange} readOnly={this.state.readOnly}/>
                    {hideCancel && <p className='input-Email'>Email</p>}
                    {hideCancel && <input type="text" size="50" style={{width: '720px'}} defaultValue={this.state.email} onChange={this.handleChange} readOnly/>}
                    {hideCancel && <p className='input-site'>Site</p>}
                    {hideCancel && <input type="text" size="50" style={{width: '720px'}} defaultValue={this.state.site} onChange={this.handleChange} readOnly/>}
                    <p className='input-phoneNumber' hidden={(this.state.userType === 'volunteer') ? false : true}>Phone Number</p>
                    <input type="text" id='phoneNumber' size="50" style={{width: '720px'}} defaultValue={this.state.phoneNumber} onChange={this.handleChange} readOnly={this.state.readOnly} hidden={(this.state.userType === 'volunteer') ? false : true}/>
                    
                    <p className='input-phoneNumber' hidden={(this.state.userType === 'volunteer') ? false : true}>Volunteer Roles</p>
                    <div className="volunteerType" hidden={(this.state.userType === 'volunteer') ? false : true}>
                        <input type="checkbox" id="driver" checked={driver} onChange={this.updateType}/>
                        <label for="driver" id="driver-text">Driver</label>
                        <input type="checkbox" id="kitchenStaff" checked={kitchenStaff} onChange={this.updateType}/>
                        <label for="kitchen" id= "kitchen-text">Kitchen Volunteer</label>
                    </div>
                    
                    <p className='input-availability' hidden={(this.state.userType === 'volunteer') ? false : true}>Availability</p>
                    <table style={{marginTop: "10px", marginLeft: "auto", marginRight: "auto"}} className="availability-table" hidden={(this.state.userType === 'volunteer') ? false : true}>
                        <tr>
                            <th><label for="volunteer-m">Monday</label></th>
                            <th><label for="volunteer-t">Tuesday</label></th>
                            <th><label for="volunteer-w">Wednesday</label></th>
                            <th><label for="volunteer-th">Thursday</label></th>
                            <th><label for="volunteer-f">Friday</label></th>
                        </tr>
                        <tr>
                            <td><input type="checkbox" onChange={e => this.updateCheckbox(e, "M")} checked={M} readOnly={this.state.readOnly}/></td>
                            <td><input type="checkbox" onChange={e => this.updateCheckbox(e, "T")} checked={T} readOnly={this.state.readOnly}/></td>
                            <td><input type="checkbox" onChange={e => this.updateCheckbox(e, "W")} checked={W} readOnly={this.state.readOnly}/></td>
                            <td><input type="checkbox" onChange={e => this.updateCheckbox(e, "Th")} checked={Th} readOnly={this.state.readOnly}/></td>
                            <td><input type="checkbox" onChange={e => this.updateCheckbox(e, "F")} checked={F} readOnly={this.state.readOnly}/></td>
                        </tr>
                    </table>
                    <p className='input-notes' hidden={(this.state.userType === 'volunteer') ? false : true}>Notes</p>
                    <textarea type="text" id="notes" value={notes} onChange={e => this.setState({notes: e.target.value})} size="50" style={{"width": "720px", "padding": "10px"}} readOnly={this.state.readOnly} hidden={(this.state.userType === 'volunteer') ? false : true}/>
                </div>
                <div id='buttons'>
                    <button id="changes-button" className="generic-button" type="submit" onClick={this.edit} style={{width: '100%'}}>EDIT PROFILE</button>
                    {hideCancel && <button className="generic-button" type="submit" onClick={this.signOut} style={{width: '100%'}}>SIGN OUT</button>}
                    {!hideCancel && <button className="generic-button" type="submit" onClick={this.cancel} style={{width: '100%'}}>CANCEL</button>}
                </div>
            </div>
        ); 
    }
}

export default Profile;