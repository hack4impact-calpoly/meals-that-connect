import React, { Component } from 'react';
import { Link } from "react-router-dom";
import MTCLogo from '../../MTC_logo.png';

import VolunteerScheduleNavbar from './showScheduleNavBar';
import VolunteerScheduleTable from './showScheduleTable';
import Spinner from "react-bootstrap/Spinner"


class showSchedule extends Component {
    constructor(props){
		super(props);
		this.state = {
			personalData: {
                phoneNumber: "",
                email: localStorage.getItem("userEmail"),
                days: {},  
                notes: ""
            },
            weekArr: [],
            holidayArr: [],
            totals: [" ", " "]
		}
    }

    updateWeek = (week) => {
        this.setState({weekArr: week})
    }

    updateHoliday = (holidays) => {
        this.setState({holidayArr: holidays})
    }

    render() {
        let {weekArr, holidayArr} = this.state
        return (
            <div className = "schedule-volunteer">
                <h1 style={{paddingTop: "100px"}}>Driver Schedule</h1>
                <VolunteerScheduleNavbar updateWeek={this.updateWeek} updateHoliday={this.updateHoliday}/>
                <div className="site-manager-container" style={{paddingLeft: 0}}>
                {this.state.totals ? <div id="volunteer-schedule"><VolunteerScheduleTable weekArr={weekArr} holidayArr={holidayArr}/></div> : 
                        <div>
                            <Spinner animation="border" role="status" />
                        </div>}
                </div>
            </div>
        );
    }
}

export default showSchedule;