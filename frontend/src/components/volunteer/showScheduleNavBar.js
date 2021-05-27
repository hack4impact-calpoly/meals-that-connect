import React, { Component } from 'react';
import '../../css/routesNavbar.css';
import { HashLink as Link } from "react-router-hash-link";
import Calendar from '../sitemanager/calendar';

class VolunteerScheduleNavbar extends Component {

    constructor(props) {
        super(props);
        this.state = { isSticky: false};
    }

    render() {

        return (
            <div className="site-manager-sidebar" style={{margin: '10px 30px 0px 30px', marginRight: 10, width: 'auto'}}>
                <h1 style={{padding: '10px 25px'}}><b>Volunteer</b></h1>
                <hr></hr>
                <nav className="route-links">
                    <Calendar updateWeek={this.props.updateWeek} updateHoliday={this.props.updateHoliday}/>
                    <Link to="/show-my-schedule">
                        <button type="button" className="route">Overview</button>
                    </Link><br/>
                </nav>
            </div>
        );
    }
}

export default VolunteerScheduleNavbar;