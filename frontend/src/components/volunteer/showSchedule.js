import React, { Component } from 'react';
import VolunteerScheduleNavbar from './showScheduleNavBar';
import VolunteerScheduleTable from './showScheduleTable';
import Spinner from "react-bootstrap/Spinner"
import "../../css/LogHours.css";


class showSchedule extends Component {
    constructor(props){
		super(props);
		this.state = {
			personalData: {
                firstName: '',
                lastName: '',
                email: '',
                site: '',
                userType: localStorage.getItem('userType'),
                id: ''
            },
            weekArr: [],
            holidayArr: [],
            routes: [],
            loaded: false,
            prevWeek: false, /*checks to see if accessing a previous week */
            mon: false,
            tue: false,
            wed: false,
            thu: false,
            fri: false
		}
    }

    updateWeek = (week) => {
        this.setState({weekArr: week})
        this.getDifferenceInDates(this.getMonday(new Date()), week[1]);
        //this.fetchSchedule();
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

    getDifferenceInDates = (date1, date2) => {
        const diffInDays = date2.getDate() - date1.getDate();

        if (diffInDays < 0)
            this.setState({ prevWeek: true })
        else
            this.setState({ prevWeek: false })
    }

    updatePDF = (day) => {
        let {mon, tue, wed, thu, fri} = this.state;
        
        //if-statements to not cause render error for updating days

        if ((day == "mon") && !mon)
            this.setState({mon: true})
        if (day == "tue" && !tue)
            this.setState({tue: true})
        if (day == "wed" && !wed)
            this.setState({wed: true})
        if (day == "thu" && !thu)
            this.setState({thu: true})
        if (day == "fri" && !fri)
            this.setState({fri: true})
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
        let site = localStorage.getItem('site')
        let info = {
            email: email,
            site: site,
            token: localStorage.getItem("token")
        }
        let personalData = this.state.personalData;

        let response = await fetch(process.env.REACT_APP_SERVER_URL + 'volunteers/current-volunteer', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(info)
        })
        const data = await response.json();

        personalData.firstName = data.firstName
        personalData.lastName =  data.lastName
        personalData.site = site
        personalData.email = email
        personalData.id = data.id
        
        this.setState( { personalData: personalData })
    }

    async fetchSchedule(){
        let info = {
            site: localStorage.getItem("site"),
            startDate: this.state.weekArr[1],
            token: localStorage.getItem("token") 
        }

        this.getDifferenceInDates(this.getMonday(new Date()), info.startDate);

        let response = await fetch(process.env.REACT_APP_SERVER_URL + 'schedules/get', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(info)
        })
        const data = await response.json();
        //console.log(data)
        this.setState({ loaded: true, routes: data.routes })
    }

    render() {
        let {weekArr, holidayArr, personalData, routes, loaded, prevWeek} = this.state
        
        return (
            <div className = "schedule-volunteer">
                <h1 style={{paddingTop: "150px"}}>Driver Schedule</h1>
                <VolunteerScheduleNavbar updateWeek={this.updateWeek} updateHoliday={this.updateHoliday}/>
                <div className="site-manager-container" style={{paddingLeft: 30}}>
                {this.state.loaded ? <div className="schedule-volunteer-table"><VolunteerScheduleTable routes={routes} prevWeek={prevWeek} personalData={personalData} updatePDF={this.updatePDF} weekArr={weekArr} holidayArr={holidayArr}/></div> : 
                        <div>
                            <Spinner animation="border" role="status" />
                        </div>}
                </div>
            </div>
        );
    }
}

export default showSchedule;