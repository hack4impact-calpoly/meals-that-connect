import React, { Component } from 'react';
import Spinner from "react-bootstrap/Spinner"
import 'bootstrap/dist/css/bootstrap.min.css';
import VolunteerOverviewTable from './VolunteerOverviewTable'
import env from "react-dotenv";

class VolunteerOverview extends Component {
    constructor(props) {
        super(props);
        this.state = {
            volunteerData: [],
            loaded: false
        };
    }

    async componentDidMount(){
        let info = {
            site: "SLO",
        }
        let response = await fetch(env.backendURL + 'volunteers/volunteerSite', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(info)
        })
        const data = await response.json();
        
        this.setState({volunteerData: data, loaded: true})
    }

    render() {
        return (
            <div style={{marginTop: "100px"}} id="overview">
                <h2>Volunteer Overview</h2>
                    {this.state.loaded === true ? <VolunteerOverviewTable data={this.state.volunteerData}/> : 
                    <div>
                        <Spinner animation="border" role="status" />
                    </div>}
            </div>
        );
    }
}

export default VolunteerOverview;