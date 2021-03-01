import React, { Component } from 'react';
import VolunteerHoursTable from './VolunteerHoursTable'
import env from "react-dotenv";

class VolunteerHoursOverview extends Component {
    constructor(props) {
        super(props);
        this.state = {
            volunteers: [],
            loaded: false
        };
    }

    async componentDidMount() {
        let info = {
            site: "SLO",
        }
        let response = await fetch(env.backendURL + 'volunteers/siteVolunHours', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(info)
        })
        const data = await response.json();
        this.setState({volunteers: [...this.state.volunteers, data]})
        this.setState({loaded: true}) 
        return data;
    }

    render() {
        return (
            <div style={ { marginTop: '100px' } } id='overview'>
                <h2>Volunteer Hours Overview</h2>
                <div id='volunteer-table'>
                    {this.state.loaded === true &&
                        <VolunteerHoursTable data={this.state.volunteers}/>
                    }
                    
                </div>
            </div>
        );
    }
}

export default VolunteerHoursOverview;