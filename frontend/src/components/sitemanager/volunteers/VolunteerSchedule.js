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
            prevWeekGet: false,
            weekArr: [],
            holidaysArr: [],
            routes: [],
            mealPrep: [],
            mealPrep2: [],
            mealPrep3: [],
            mealPrep4: [],
            mealPrep5: [],
            staff: [],
            computer: [],
            prevWeek: {}
        };
    }

    updateWeek = (week) => {
        this.state.weekArr = week
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
        // this.fetchSchedule();
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
            computer: props.computer,
            token: localStorage.getItem("token")
        }
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
            token: localStorage.getItem("token")
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
    }

    async fetchSchedule(){
        var currentWeek = new Date(this.state.weekArr[1])
        var currentWeekCopy = new Date(currentWeek)
        var oneWeekAgo = new Date(currentWeek.setDate(currentWeek.getDate() - 7))
        let prevWeekInfo = {
            site: localStorage.getItem("site"),
            startDate: oneWeekAgo,
            prevData: null,
            token: localStorage.getItem("token")
        }
        await fetch(process.env.REACT_APP_SERVER_URL + 'schedules/get', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(prevWeekInfo)
        })
        .then(response => response.json())
        .then((res1)=>{
            let info = {
                site: localStorage.getItem("site"),
                startDate: currentWeekCopy,
                prevData: res1,
                token: localStorage.getItem("token")
            }
            fetch(process.env.REACT_APP_SERVER_URL + 'schedules/get', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(info)
            })
            .then(response=>response.json())
            .then((res2)=>{
                this.setState({ loaded: true, 
                                routes: res2.routes, 
                                mealPrep: res2.mealPrep, 
                                mealPrep2: res2.mealPrep2, 
                                mealPrep3: res2.mealPrep3, 
                                mealPrep4: res2.mealPrep4, 
                                mealPrep5: res2.mealPrep5, 
                                staff: res2.staff, 
                                computer: res2.computer})
                console.log(this.state)
            })
        })
    }

    render() {
        let {loaded, routes, weekArr, holidayArr, mealPrep, mealPrep2, mealPrep3, mealPrep4, mealPrep5, staff, computer, volunteers} = this.state

        return (
            <div >
                <h1 className="site-manager-page-header">Volunteer Schedule Overview</h1>
                <VolunteerNavbar updateWeek={this.updateWeek} updateHoliday={this.updateHoliday}/>
                <div className="site-manager-container" style={{paddingLeft: 0}}>
                {this.state.loaded ? routes ? <VolunteersScheduleTable volunteers={volunteers} routes={routes} weekArr={weekArr} holidayArr={holidayArr} 
                                        mealPrep={mealPrep} mealPrep2={mealPrep2} mealPrep3={mealPrep3} mealPrep4={mealPrep4} mealPrep5={mealPrep5} 
                                        staff={staff} computer={computer} handleSelect={this.handleSelect}/> : <div> No schedule found</div> :
                    <div id = "spin">
                        <Spinner animation="border" role="status" style={{width:'70px', height:'70px', left: '50%', right: '40%', top: '40%', display: 'block', position:'absolute'}}/>
                    </div>}
                </div>
            </div>
        );
    }
}

export default VolunteerSchedule;