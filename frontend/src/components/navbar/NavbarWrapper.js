import React, { Component } from 'react';
import { Link } from "react-router-dom";
import MTCLogo from '../../MTC_logo.png';

import VolunteerNavBar from './VolunteerNavbar'
import DataEntryNavBar from './DataEntryNavBar'
import SiteManagerNavBar from './SiteManagerNavBar'

class NavBar extends Component {

    constructor(props) {
        super(props);
        this.state = { userType: localStorage.getItem('userType')};
    }

    render() {
        let navbar;
        if (this.state.userType === 'site-manager')
        {
            navbar = <SiteManagerNavBar />
        }
        else if (this.state.userType === 'data-entry')
        {
            navbar = <DataEntryNavBar />
        }
        else if (this.state.userType === 'volunteer')
        {
            navbar = <VolunteerNavBar />
        }

        else {
            navbar = 
            <div className = "navbar">
                <div className = "navbar-left">
                    <img src={MTCLogo} style={{height: '100px'}} />
                </div>
                <div className="navbar-right">
                    <Link className="navbar-link" to="/">Home</Link>
                    <Link className="navbar-link" to="/login">Login</Link>
                    <Link className="navbar-link" to="/signup">Signup</Link>
                </div>
            </div>
        }

        return (
            <div>
                {navbar}
            </div>
        );
    }
}

export default NavBar;
