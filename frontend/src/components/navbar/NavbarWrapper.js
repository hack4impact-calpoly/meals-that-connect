import React, { Component } from 'react';
import { Link } from "react-router-dom";

import DataVolunteerNavBar from './DataVolunteerNavBar'
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
            navbar = <DataVolunteerNavBar />
        }
        else if (this.state.userType === 'volunteer')
        {
            navbar = <DataVolunteerNavBar />
        }

        else {
            navbar = <div className = "navbar">
                        <h2>Meals that Connect</h2>
                            <Link className="navbar-link" to="/">Home</Link>
                            <Link className="navbar-link" to="/login">Login</Link>
                            <Link className="navbar-link" to="/signup">Signup</Link>
                            <Link className="navbar-link" to="/signout">Signout</Link>
                    </div>
        }

        return (
            <div>
                {navbar}
            </div>
        );
    }

    // render() {
    //     return (
    //         <div className = "navbar">
    //             <h2>Meals that Connect</h2>
    //                 <Link className="navbar-link" to="/">Home</Link>
    //                 <Link className="navbar-link" to="/login">Login</Link>
    //                 <Link className="navbar-link" to="/signup">Signup</Link>
    //                 <Link className="navbar-link" to="/signout">Signout</Link>
    //         </div>
    //     );
    // }
}

export default NavBar;
