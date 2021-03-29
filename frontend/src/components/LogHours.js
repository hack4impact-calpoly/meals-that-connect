import React, { Component } from 'react';
import LoggedHoursTable from "./LoggedHoursTable";
import "../css/LogHours.css";
import env from "react-dotenv";

class LogHours extends Component {
    constructor(props) {
        super(props);
        this.state = {
            volunteerID: localStorage.getItem("volunteerID"),
            log: [],
            date: "",
            hours : "",
        };
    }

    handleChange = (e) => {
        this.setState({ [e.target.id]: e.target.value });
    };

    async componentDidMount(){
        let info = {
           volunteerID: this.state.volunteerID,
        }
        // let response = await fetch(env.backendURL + 'hours/all', {
        //    method: 'POST',
        //    headers: {
        //       'Content-Type': 'application/json'
        //    },
        //    body: JSON.stringify(info)
        // })
        // const data = await response.json();

        console.log(info)

        fetch(env.backendURL + 'hours/all', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(info)
        })
        .then((res) => {
            if (res.status === 404) {
                this.setState({error: true})
            }
            else {
                return res.json()
            }
        })
        .then((data) => {
            console.log(data)
            this.setState({log: data})
        })
        .catch(err => {
            console.log("Error")
            this.setState({error: true})
        })

     }

    newLog = () => {
        const hourLog = {
            volunteerID: this.state.volunteerID,
            date: this.state.date,
            hours: this.state.hours
        }
        console.log(hourLog)
        fetch(env.backendURL + 'hours/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(hourLog)
        })
        .then((res) => {
            console.log(res);
        })
        .catch(err => {
            console.log("Error")
            this.setState({error: true})
        })
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
                <button id="submit-button" type="submit" onClick={this.newLog}>SUBMIT</button>
                <br/>
                <LoggedHoursTable data={this.state.log}/>
            </div>
        );
    }
}

export default LogHours;