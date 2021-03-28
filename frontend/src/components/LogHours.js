import React, { Component } from 'react';
import LoggedHoursTable from "./LoggedHoursTable";
import "../css/LogHours.css";


class LogHours extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "", // should be passed in upon entering page
            password: "", // should be passed in upon entering page
            date: "",
            hours : "",
        };
    }

    handleChange = (e) => {
        this.setState({ [e.target.id]: e.target.value });
    };

    addHours = (email, date, hours) => {
        const newDataEntry = {
        }
    }

    render() {
        return (
            <div className="logging-container">
                <br/>
                <h1 style={{paddingTop: "100px"}}>Log Hours</h1>
                <br/>
                <p className= "input-date">Date</p>
                <input type="text" id="date" size="50" style={{width: '500px'}} onChange={this.handleChange}/>
                <br/>
                <p className= "input-hours">Hours</p>
                <input type="text" id="hours" size="50" style={{width: '500px'}} onChange={this.handleChange}/>
                <br/>
                <button id="submit-button" type="submit" onClick={this.addHours(this.state.email, this.state.date, this.state.hours)}>SUBMIT</button>
                <br/>
                <LoggedHoursTable/>
            </div>
        );
    }
}

export default LogHours;