import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './../css/manager.css'
import VolunteerOverviewTable from './VolunteerOverviewTable'

class VolunteerOverview extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }


    render() {
        return (
            <div style={{marginTop: "100px"}} id="overview">
                <h2>Volunteer Overview</h2>
                <VolunteerOverviewTable/>
            </div>
        );
    }
}

export default VolunteerOverview;