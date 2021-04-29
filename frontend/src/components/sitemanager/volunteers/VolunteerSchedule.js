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
           volunteerData: [100, 100, 100],
           loaded: true //original: false
        };
    }

    // async componentDidMount(){
    //    let info = {
    //       site: "SLO",
    //    }
    //    let response = await fetch(env.backendURL + 'volunteers/siteVolunHours', {
    //       method: 'POST',
    //       headers: {
    //          'Content-Type': 'application/json'
    //       },
    //       body: JSON.stringify(info)
    //    })
    //    const data = await response.json();

    //    this.setState({volunteerData: data, loaded: true})
    // }

    render() {
        return (
            <div >
                <h1 className="site-manager-page-header">Volunteer Hours Overview</h1>
                <VolunteerNavbar/>
                <div className="site-manager-container" style={{paddingLeft: 0}}>
                    {this.state.loaded === true ? <VolunteersScheduleTable data={this.state.volunteerData}/> :
                    <div>
                        <Spinner animation="border" role="status" />
                    </div>}
                </div>
            </div>
        );
    }
}

export default VolunteerSchedule;