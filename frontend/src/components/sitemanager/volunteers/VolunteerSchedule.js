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
            weekArr: [],
            holidaysArr: [],
            routes: [],
            mealPrep: [],
            staff: [],
            computer: []
        };
    }

    updateWeek = (week) => {
        console.log(week)
        this.state.weekArr = week;
        this.fetchSchedule();
    }

    updateHoliday = (holidays) => {
        console.log(holidays)
        this.setState({holidayArr: holidays})
    }

    getMonday = (d) => {
        d = new Date(d); // turns passed in string into date
        var day = d.getDay(), // current date
            diff = d.getDate() - day + (day == 0 ? -6:1); // adjust when day is sunday; take the difference to find monday
        return new Date(d.setDate(diff));
      }
      

    async componentWillMount(){
        this.state.weekArr[1] = this.getMonday(new Date());
        console.log("mount")
        this.fetchSchedule();
    }

    async fetchSchedule(){
        
        let info = {
        site: localStorage.getItem("site"),
        startDate: this.state.weekArr[1] //new Date("May 3, 2021"), // HEELPPPP: task --- figureout how to get start date!
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

    render() {
        console.log("schedule overview week array and routes")
        let {loaded, routes, weekArr, holidayArr, mealPrep, staff, computer} = this.state
        console.log(weekArr[1])
        console.log(routes[4])
        return (
            <div >
                <h1 className="site-manager-page-header">Volunteer Schedule Overview</h1>
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