import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { isLoggedIn } from './authentication/authenticationUtils';

class NavBar extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            loggedIn: isLoggedIn(),
            userType: localStorage.getItem("userType")
        };
    }
    render() {
        return (
            <div className = "navbar">
                <h2>Meals that Connect</h2>
                    {(!this.state.loggedIn) && (<Link className="navbar-link" to="/">Home</Link>)}
                    {(!this.state.loggedIn) && (<Link className="navbar-link" to="/login">Login</Link>)}
                    {(!this.state.loggedIn) && (<Link className="navbar-link" to="/signup">Signup</Link>)}
                    {(!this.state.loggedIn) && (<Link className="navbar-link" to="/signout">Signout</Link>)}
                    {(this.state.loggedIn && this.state.userType === "site-manager") && (<Link className="navbar-link" to="/routes">Routes</Link>)}
                    {(this.state.loggedIn && this.state.userType === "site-manager") && (<Link className="navbar-link" to="/volunteer">Volunteers</Link>)}
                    {(this.state.loggedIn && this.state.userType === "site-manager") && (<Link className="navbar-link" to="/">Clients</Link>)}
                    {this.state.loggedIn && 
                        <Link className="navbar-link" to="/signout">
                            <img src = "https://static.thenounproject.com/png/3070444-200.png" style={{height: '35px', marginLeft : '300px'}}/>
                        </Link>
                    }

            </div>
        );
    }
}

export default NavBar;
