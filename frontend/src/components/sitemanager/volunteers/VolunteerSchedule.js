import React, { Component } from 'react';
import Spinner from "react-bootstrap/Spinner"
import 'bootstrap/dist/css/bootstrap.min.css';
import VolunteersScheduleTable from './VolunteersScheduleTable.js'
import VolunteerNavbar from './VolunteerNavbar'
import env from "react-dotenv";
import Calendar from '.././calendar'

class VolunteerSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false, //original: false,
            week: [],
            holidays: [],
            routes: [],
            mealPrep: [],
            staff: [],
            computer: []
        };
    }

    updateWeek = (week) => {
        console.log(week)
        this.setState({weekArr: week})
    }

    updateHoliday = (holidays) => {
        console.log(holidays)
        this.setState({holidayArr: holidays})
    }

    async componentDidMount(){
        let info = {
        site: localStorage.getItem("site"),
        startDate: new Date() // HEELPPPP: task --- figureout how to get start date!
    }
    let response = await fetch(process.env.REACT_APP_SERVER_URL + 'schedules/get', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(info)
    })
    const data = await response.json();
    
    this.setState({loaded: true, routes: data.routes, mealPrep: data.mealPrep, staff: data.staff, computer: data.computer})
    }

    ///{this.state.scheduleData ? <VolunteersScheduleTable routes={routes} weekArr={weekArr} holidaysArr={holidayArr} routes={routes} mealPrep={mealPrep} staff={staff} computer={computer}/> :
    render() {
        let {loaded, routes, weekArr, holidayArr, mealPrep, staff, computer} = this.state
        console.log(mealPrep)
        console.log(routes)
        return (
            <div >
                <h1 className="site-manager-page-header">Volunteer Hours Overview</h1>
                <VolunteerNavbar updateWeek={this.updateWeek} updateHoliday={this.updateHoliday}/>
                <div className="site-manager-container" style={{paddingLeft: 0}}>
                {this.state.loaded ? <VolunteersScheduleTable routes={routes} weekArr={weekArr} holidayArr={holidayArr} mealPrep={mealPrep} staff={staff} computer={computer}/> :
                    <div>
                        <Spinner animation="border" role="status" />
                    </div>}
                </div>
            </div>
        );
    }
}

export default VolunteerSchedule;