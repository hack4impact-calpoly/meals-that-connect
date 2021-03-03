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
            <div className="site-manager-page">
                <h1 className="site-manager-page-header">Volunteer Overview</h1>
                <div className="site-manager-container2">
                    {this.state.loaded === true ? <VolunteerOverviewTable data={this.state.volunteerData}/> : 
                    <div>
                        <Spinner animation="border" role="status" />
                    </div>}
                </div>
            </div>
        );
    }
}

export default VolunteerOverview;
