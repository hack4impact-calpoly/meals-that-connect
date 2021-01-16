import React, { Component } from 'react';
import { Link } from "react-router-dom";


class NavBar extends Component {
    render() {
        return (
            <div className="navbar">
                <h5>Meals that Connect</h5>
                    <Link className="navbar-link" to="/">Home</Link>
                    <Link className="navbar-link" to="/login">Login</Link>
                    <Link className="navbar-link" to="/private">Private</Link>
            </div>
        );
    }
}

export default NavBar;