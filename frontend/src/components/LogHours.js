import React, { Component } from 'react';
import LoggedHoursTable from "./LoggedHoursTable";
import "../css/LogHours.css";
import env from "react-dotenv";
import Moment from 'moment';

class LogHours extends Component {
    constructor(props) {
        super(props);
        this.state = {
            volunteerID: localStorage.getItem("volunteerID"),
            log: [],
            date: '',
            hours : "",
        };
    }

    handleChange = (e) => {
        this.setState({ [e.target.id]: e.target.value });
    };

    async componentDidMount(){
        let date = new Date()
        this.state.date = Moment(date).format('YYYY-MM-DD')
        let info = {
           volunteerID: this.state.volunteerID,
        }

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

    deleteLog = (data) => {
        let logs = this.state.log
        let index = logs.indexOf(data)
        console.log(data)
        console.log(index)
        this.setState({
            log: this.state.log.filter((_, i) => i !== index)
        });
        window.location.reload();
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
        console.log(this.state.log)
        return (
            <div className="logging-container">
                <form className="log-input-box" onSubmit={this.newLog}>
                    <br/>
                    <h1 style={{paddingTop: "100px"}}>Log Hours</h1>
                    <br/>
                    <p className= "input-date">Date</p>
                    <input type="date" id="date" size="50" className="log-input" defaultValue={this.state.date} required={true} onChange={this.handleChange}/>
                    <br/>
                    <p className= "input-hours">Hours</p>
                    <input type="number" id="hours" size="50" className="log-input" step="0.01" required={true} onChange={this.handleChange}/>
                    <br/>
                    <button id="submit-button" className="log-input"  type="submit">SUBMIT</button>
                    <br/>
                </form>
                <LoggedHoursTable data={this.state.log} deleteLog={this.deleteLog}/>
            </div>
        );
    }
}

export default LogHours;