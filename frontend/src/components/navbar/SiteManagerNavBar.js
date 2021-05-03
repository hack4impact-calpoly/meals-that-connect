import React, { Component } from 'react';
import { Link } from "react-router-dom";

class SiteManagerNavBar extends Component {
    render() {
        return (
            <div className = "navbar">
                <h2>Meals that Connect</h2>
                    <Link className="navbar-link" to="/routes">Routes</Link>
                    <Link className="navbar-link" to="/volunteer">Volunteers</Link>
                    <Link className="navbar-link" to="/clients">Clients</Link>
                    <Link className="navbar-link" to="/profile">
                        <img src = "https://static.thenounproject.com/png/3070444-200.png" height="35" />
                    </Link>
            </div>
        );
    }
}

export default SiteManagerNavBar;