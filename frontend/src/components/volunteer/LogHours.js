import React, { Component } from 'react';
import LoggedHoursTable from "./LoggedHoursTable";
import "../../css/LogHours.css";
import Moment from 'moment';

class LogHours extends Component {
    constructor(props) {
        super(props);
        this.state = {
            volunteerID: localStorage.getItem("volunteerID"),
            logs: [],
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

        fetch(process.env.REACT_APP_SERVER_URL + 'hours/all', {
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
            this.setState({logs: data})
        })
        .catch(err => {
            console.log("Error")
            this.setState({error: true})
        })

     }

    deleteLog = (data) => {
        let logs = this.state.logs
        let index = logs.indexOf(data)
        this.setState({
            logs: this.state.logs.filter((_, i) => i !== index)
        });
        window.location.reload();
    }

    newLog = () => {
        const hourLog = {
            volunteerID: this.state.volunteerID,
            date: this.state.date,
            hours: this.state.hours
        }
        fetch(process.env.REACT_APP_SERVER_URL + 'hours/add', {
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
        let hoursExist = this.state.logs.length > 0

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
                {hoursExist? <LoggedHoursTable data={this.state.logs} deleteLog={this.deleteLog}/> 
                : <h2>No hours logged so far</h2>}
            </div>
        );
    }
}

export default LogHours;