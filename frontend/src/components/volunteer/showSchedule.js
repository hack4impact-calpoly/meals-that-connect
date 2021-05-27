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
                firstName: '',
                lastName: '',
                email: '',
                site: '',
                phoneNumber: '',
                availability: {
                    M: '', 
                    T: '', 
                    W: '', 
                    Th: '', 
                    F: ''
                },
                driver: false,
                kitchenStaff: false,
                userType: localStorage.getItem('userType'),
                volunteerID: ''
            },
            weekArr: [],
            holidayArr: [],
            routes: [],
            loaded: false
		}
    }

    updateWeek = (week) => {
        this.setState({weekArr: week})
    }

    updateHoliday = (holidays) => {
        this.setState({holidayArr: holidays})
    }

    getMonday = (d) => {
        d = new Date(d); // turns passed in string into date
        var day = d.getDay(), // current date
        diff = d.getDate() - day + (day === 0 ? -6:1); // adjust when day is sunday; take the difference to find monday
        return new Date(d.setDate(diff));
    }

    async componentWillMount(){
        this.state.weekArr[1] = this.getMonday(new Date());
        //await this.fetchVolunteers();
        //this.fetchSchedule();
        await this.fetchUserData();
        this.fetchSchedule();
    }

    async fetchUserData () {
        let email = localStorage.getItem('userEmail')
        let type = localStorage.getItem('userType')
        console.log(type)
        let info = {
            email: email,
            userType: type
        }
        let personalData = this.state.personalData;

        //console.log(info.email)
        //console.log(info.userType)
        //console.log(localStorage.getItem('userType'))

        let response = await fetch(process.env.REACT_APP_SERVER_URL + 'profile', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(info)
        })
        const data = await response.json();
        
        if (type === "volunteer") {
            //localStorage.setItem("volunteerID", data.volunteerID)
             
            personalData.firstName = data.firstName
            personalData.lastName =  data.lastName
            personalData.site = data.site
            personalData.email = email
            personalData.phoneNumber = data.phoneNumber
            personalData.availability = data.availability
            personalData.kitchenStaff = data.kitchenStaff
            personalData.driver = data.driver
            personalData.volunteerID = data.volunteerID
            
            this.setState( { personalData: personalData })
            
        }
    }

    async fetchSchedule(){
        console.log("here")
        let info = {
            site: localStorage.getItem("site"),
            //startDate: this.state.weekArr[1] 
        }
        let response = await fetch(process.env.REACT_APP_SERVER_URL + 'schedules/driver-schedule', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(info)
        })
        const data = await response.json();
        console.log(data)
        this.setState({ loaded: true, routes: data })
    }

    render() {
        let {weekArr, holidayArr, personalData, routes, loaded} = this.state
        console.log(personalData.firstName);
        console.log(routes);
        console.log(loaded);
        return (
            <div className = "schedule-volunteer">
                <h1 style={{paddingTop: "100px"}}>Driver Schedule</h1>
                <VolunteerScheduleNavbar updateWeek={this.updateWeek} updateHoliday={this.updateHoliday}/>
                <div className="site-manager-container" style={{paddingLeft: 0}}>
                {this.state.loaded ? <div id="volunteer-schedule"><VolunteerScheduleTable routes={routes} personalData={personalData} weekArr={weekArr} holidayArr={holidayArr}/></div> : 
                        <div>
                            <Spinner animation="border" role="status" />
                        </div>}
                </div>
            </div>
        );
    }
}

export default showSchedule;