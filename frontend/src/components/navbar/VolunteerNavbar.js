import React, { Component } from 'react';
import { Link } from "react-router-dom";
import MTCLogo from '../../MTC_logo.png';

class VolunteerNavBar extends Component {
    render() {
        return (
            <div className = "navbar">
                <div className = "navbar-left">
                    <img src={MTCLogo} style={{height: '100px'}} />
                </div>
                <div className="navbar-right">
                    <Link className="navbar-link" to="/" style={{marginLeft : '100px'}}>Home</Link>
                    <Link className="navbar-link" to="/show-my-schedule" style={{marginLeft : '20px'}}>Schedule</Link>
                    <Link className="navbar-link" to="/profile">
                        <img src = "https://static.thenounproject.com/png/3070444-200.png" style={{height: '35px'}}/>
                    </Link>
                </div>
            </div>
        );
    }
}

export default VolunteerNavBar;