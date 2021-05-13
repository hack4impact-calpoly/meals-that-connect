import React, { Component } from 'react';
import VolunteerHoursTable from './VolunteerHoursTable'
import VolunteerNavbar from './VolunteerNavbar'
import 'bootstrap/dist/css/bootstrap.min.css';
import Spinner from "react-bootstrap/Spinner"

class VolunteerHoursOverview extends Component {
    constructor(props) {
        super(props);
        this.state = {
           volunteerData: [],
           loaded: false,
           week: [],
           holiday: []
        };
    }
    
    updateWeek = (week) => {
        console.log(week)
        this.setState({weekArr: week})
    }

    updateHoliday = (holidays) => {
        console.log(holidays)
        this.setState({holidayArr: holidays})
    }

    async componentDidMount(){
       let info = {
          site: localStorage.getItem("site"),
       }
       let response = await fetch(process.env.REACT_APP_SERVER_URL + 'volunteers/siteVolunHours', {
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
            <div >
                <h1 className="site-manager-page-header">Volunteer Hours Overview</h1>
                <VolunteerNavbar updateWeek={this.updateWeek} updateHoliday={this.updateHoliday}/>
                <div className="site-manager-container" style={{paddingLeft: 0}}>
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
