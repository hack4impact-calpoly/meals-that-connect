import React, { Component } from 'react';
import VolunteerHoursTable from './VolunteerHoursTable'
import 'bootstrap/dist/css/bootstrap.min.css';
import Spinner from "react-bootstrap/Spinner"
import env from "react-dotenv";

class VolunteerHoursOverview extends Component {
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
       let response = await fetch(env.backendURL + 'volunteers/siteVolunHours', {
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
                <h1 className="site-manager-page-header">Volunteer Hours Overview</h1>
                <div className="site-manager-container3">
                    {this.state.loaded === true ? <VolunteerHoursTable data={this.state.volunteerData}/> :
                    <div>
                        <Spinner animation="border" role="status" />
                    </div>}
                </div>
            </div>
        );
    }
}

export default VolunteerHoursOverview;
