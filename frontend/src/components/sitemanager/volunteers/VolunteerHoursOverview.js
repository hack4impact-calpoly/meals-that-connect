import React, { Component } from 'react';
import { getWeekArr } from '../calendar'
import VolunteerHoursTable from './VolunteerHoursTable'
import VolunteerNavbar from './VolunteerNavbar'
import 'bootstrap/dist/css/bootstrap.min.css';
import Spinner from "react-bootstrap/Spinner"

class VolunteerHoursOverview extends Component {
    constructor(props) {
        super(props);
        this.state = {
           volunteerData: [],
           loaded: false,
           weekArr: [],
           holidayArr: [],
        };
    }
    
    updateWeek = (week) => {
        console.log("Updating week")
        console.log(week)
        this.state.weekArr = week
        this.fetchHours()
    }

    updateHoliday = (holidays) => {
        console.log("Loading holidays")
        this.setState({holidayArr: holidays})
    }

    async componentDidMount(){
        console.log("Loading")
    }

    async fetchHours () {
        var weekArr = getWeekArr(new Date)
        if (this.state.weekArr.length > 0) {
            weekArr = this.state.weekArr;
        }
        console.log("Fetching hours")
        let info = {
            site: localStorage.getItem("site"),
            week: weekArr,
            token: localStorage.getItem("token")
         }
         let response = await fetch(process.env.REACT_APP_SERVER_URL + 'hours/totals', {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json'
            },
            body: JSON.stringify(info)
         })
         const data = await response.json();
         this.setState({volunteerData: data, loaded: true})
    }

    render() {
        console.log(this.state)
        let data = this.state.volunteerData
        return (
            <div >
                <h1 className="site-manager-page-header">Volunteer Hours Overview</h1>
                <VolunteerNavbar updateWeek={this.updateWeek} updateHoliday={this.updateHoliday}/>
                <div className="site-manager-container" style={{paddingLeft: 0}}>
                    {this.state.loaded === true ? 
                    data.length == 0 ? <h2 style={{textAlign: 'center', width: 'calc(100vw - 750px)'}}>No volunteer hours logged for this week</h2> : 
                    <VolunteerHoursTable data={this.state.volunteerData} weekArr={this.state.weekArr}/> :
                    <div id = "spin">
                        <Spinner animation="border" role="status" style={{width:'70px', height:'70px', left: '50%', right: '40%', top: '40%', display: 'block', position:'absolute'}}/>
                    </div>}
                </div>
            </div>
        );
    }
}

export default VolunteerHoursOverview;
