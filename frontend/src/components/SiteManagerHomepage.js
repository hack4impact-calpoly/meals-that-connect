import React, { Component } from 'react';
import MealTotals from './mealTotals';
import RoutesOverview from './routesOverview';
import env from "react-dotenv";
import './../css/manager.css'

class SiteManagerHomepage extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            totals: []
         };
    }

    async componentDidMount(){
        // fetch all clients for each route
        let routes = [1,2,3,4,4,5,6,7,8,9]
        let day = ["M", "T", "W", "Th", "F"]
        for(let i =0; i < routes.length; i++) {
            for (let j = 0; j < day.length; j++) {
                await this.fetchClients(routes[i], day[j])
            }  
        }
    }

    async fetchClients (routenum, day) {
        let info = {
            site: "SLO",
            routeNumber: routenum,
            day: day
        }
        let response = await fetch(env.backendURL + 'clients/routeSiteDay', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(info)
        })
        const data = await response.json();
        
        this.setState({totals: [...this.state.totals, data]}) 
        return data;
    }

    render() {
        return (
            <div id="overview">
                <h1 id="site-manager-header">Site Manager Overview</h1>
                <div id="main">
                    <RoutesOverview/>
                    <MealTotals data={this.state.totals}/>
                </div>
            </div>
        );
    }
}

export default SiteManagerHomepage;