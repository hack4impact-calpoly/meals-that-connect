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
            <div className="site-manager-page">
            <h1 className="site-manager-page-header">Volunteer Overview</h1>
            <div className="site-manager-container2">
                <VolunteerOverviewTable/>
            </div>
        </div>
        );
    }
}

export default VolunteerOverview;