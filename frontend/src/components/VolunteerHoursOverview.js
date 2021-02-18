import React, { Component } from 'react';
import VolunteerHoursTable from './VolunteerHoursTable'

class VolunteerHoursOverview extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }


    render() {
        return (
            <div style={ { marginTop: '100px' } } id='overview'>
                <h2>Volunteer Hours Overview</h2>
                <div id='volunteer-table'>
                    <VolunteerHoursTable/>
                </div>
            </div>
        );
    }
}

export default VolunteerHoursOverview;