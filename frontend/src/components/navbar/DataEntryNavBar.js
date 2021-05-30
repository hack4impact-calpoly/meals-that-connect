import React, { Component } from 'react';
import { Link } from "react-router-dom";
import MTCLogo from '../../MTC_logo.png';

class DataEntryNavBar extends Component {
    render() {
        return (
            <div className = "navbar">
            <div className = "navbar-left">
                    <img src={MTCLogo} className="navbar-logo" />
                </div>
                <div className="navbar-right">
                    <Link className="navbar-link" to="/">Routes</Link>
                    <Link className="navbar-link" to="/volunteer">Volunteers</Link>
                    <Link className="navbar-link" to="/clients">Clients</Link>
                    <Link className="navbar-link" to="/profile">
                        <img src = "https://static.thenounproject.com/png/3070444-200.png" height="35" />
                    </Link>
                </div>
            </div>
        );
    }
}

export default DataEntryNavBar;