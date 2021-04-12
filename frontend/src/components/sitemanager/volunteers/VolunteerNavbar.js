import React, { Component } from 'react';
import '../../../css/routesNavbar.css';
import { HashLink as Link } from "react-router-hash-link";

class VolunteerNavbar extends Component {

    constructor(props) {
        super(props);
        this.state = { isSticky: false};
    }

    render() {
        console.log("ere")

        return (
            <div className="site-manager-sidebar" style={{marginTop: 30}}>
                <h1 style={{width: 400}}><b>Volunteers</b></h1>
                <hr></hr>
                <nav className="route-links">
                    <Link to="/volunteer">
                        <button type="button" className="route">Overview</button>
                    </Link><br/>

                    <Link to="/volunteer-hours">
                        <button type="button" className="route">Hours</button>
                    </Link><br/>
                </nav>
            </div>
        );
    }
}

export default VolunteerNavbar;
