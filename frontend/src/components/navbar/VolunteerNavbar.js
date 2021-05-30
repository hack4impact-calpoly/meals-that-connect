import React, { Component } from 'react';
import { Link } from "react-router-dom";
import MTCLogo from '../../MTC_logo.png';

class VolunteerNavBar extends Component {   
    constructor(props){
		super(props);
		this.state = {volunteerDriver: false}
    }

    async componentWillMount(){
        await this.checkVolunteerDriver();
    }

    async checkVolunteerDriver () {
        let email = localStorage.getItem('userEmail')
        let site = localStorage.getItem('site')
        let volunteerID = localStorage.getItem('volunteerID')
        let token = localStorage.getItem('token')

        let info = {
            email: email,
            site: site,
            volunteerID: volunteerID,
            token: token
        }

        let response = await fetch(process.env.REACT_APP_SERVER_URL + 'volunteers/volunteer-driver-check', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(info)
        })
        const data = await response.json();
        this.setState({ volunteerDriver: data })
    }

    render() {
        let {volunteerDriver} = this.state;
        console.log(this.state)
        return (
            <div className = "navbar">
                <div className = "navbar-left">
                    <img src={MTCLogo} className="navbar-logo" />
                </div>
                <div className="navbar-right">
                    <Link className="first-navbar-link" to="/" >Home</Link>
                    {volunteerDriver ? <Link className="navbar-link" to="/show-my-schedule" style={{marginLeft : '20px'}}>Schedule</Link> : null }
                    <Link className="navbar-link" to="/profile">
                        <img src = "https://static.thenounproject.com/png/3070444-200.png" className="navbar-icon"/>
                    </Link>
                </div>
            </div>
        );
    }
}

export default VolunteerNavBar;