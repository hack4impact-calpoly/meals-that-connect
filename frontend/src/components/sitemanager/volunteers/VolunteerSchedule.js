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
            mealPrep2: [],
            mealPrep3: [],
            mealPrep4: [],
            mealPrep5: [],
            staff: [],
            computer: []
        };
    }

    updateWeek = (week) => {
        this.state.weekArr = week;
        this.fetchSchedule();
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
        await this.fetchVolunteers();
        this.fetchSchedule();
    }

    handleSelect = (site, date, props) => {
        console.log("Handling select change")
        const updateData = {
            site: site,
            startDate: date,
            routes: props.routes,
            mealPrep: props.mealPrep,
            mealPrep2: props.mealPrep2,
            mealPrep3: props.mealPrep3,
            mealPrep4: props.mealPrep4,
            mealPrep5: props.mealPrep5,
            staff: props.staff,
            computer: props.computer
        }
        console.log(updateData)
        fetch(process.env.REACT_APP_SERVER_URL + 'schedules/update', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updateData)
        })
    }

    async fetchVolunteers(){
        
        let info = {
            site: localStorage.getItem("site"),
        }
        let response = await fetch(process.env.REACT_APP_SERVER_URL + 'volunteers/availability', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(info)
        })
        const data = await response.json();
        
        this.setState({volunteers: data})
        console.log(this.state.volunteers)
    }

    async fetchSchedule(){
        
        let info = {
            site: localStorage.getItem("site"),
            startDate: this.state.weekArr[1] 
        }
        let response = await fetch(process.env.REACT_APP_SERVER_URL + 'schedules/get', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(info)
        })
        const data = await response.json();
        this.setState({loaded: true, routes: data.routes, mealPrep: data.mealPrep, mealPrep2: data.mealPrep2, mealPrep3: data.mealPrep3, mealPrep4: data.mealPrep4, mealPrep5: data.mealPrep5, staff: data.staff, computer: data.computer})
    }

    render() {
        let {loaded, routes, weekArr, holidayArr, mealPrep, mealPrep2, mealPrep3, mealPrep4, mealPrep5, staff, computer, volunteers} = this.state
        console.log(mealPrep)
        return (
            <div >
                <h1 className="site-manager-page-header">Volunteer Schedule Overview</h1>
                <VolunteerNavbar updateWeek={this.updateWeek} updateHoliday={this.updateHoliday}/>
                <div className="site-manager-container" style={{paddingLeft: 0}}>
                {this.state.loaded ? <VolunteersScheduleTable volunteers={volunteers} routes={routes} weekArr={weekArr} holidayArr={holidayArr} mealPrep={mealPrep} mealPrep2={mealPrep2} mealPrep3={mealPrep3} mealPrep4={mealPrep4} mealPrep5={mealPrep5} staff={staff} computer={computer}/> :
                    <div id = "spin">
                        <Spinner animation="border" role="status" style={{width:'70px', height:'70px', left: '50%', right: '40%', top: '40%', display: 'block', position:'absolute'}}/>
                    </div>}
                </div>
            </div>
        );
    }
}

export default VolunteerSchedule;