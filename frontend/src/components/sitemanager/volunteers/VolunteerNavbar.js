import React, { Component } from 'react';
import '../../../css/routesNavbar.css';
import { HashLink as Link } from "react-router-hash-link";

class VolunteerNavbar extends Component {

    constructor(props) {
        super(props);
        this.state = { isSticky: false};
    }

    render() {

        return (
            <div className="site-manager-sidebar" style={{margin: '10px 30px 0px 30px', marginRight: 10, width: 'auto'}}>
                <h1 style={{padding: '10px 25px'}}><b>Volunteers</b></h1>
                <hr></hr>
                <nav className="route-links">
                    <Link to="/volunteer">
                        <button type="button" className="route">Overview</button>
                    </Link><br/>

                    <Link to="/volunteer-hours">
                        <button type="button" className="route">Hours</button>
                    </Link><br/>

<<<<<<< HEAD
                    <Link to="/volunteer-schedule">
                        <button type="button" className="route">Schedule</button>
=======
                    <Link to="/add-volunteer">
                        <button type="button" className="route">Add Volunteer</button>
>>>>>>> master
                    </Link><br/>
                </nav>
            </div>
        );
    }
}

export default VolunteerNavbar;
