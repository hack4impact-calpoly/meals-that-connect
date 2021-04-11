import React, { Component } from 'react';
import MealTotals from './mealTotals';
import RoutesNavbar from './RoutesNavbar';
import env from "react-dotenv";

import Spinner from "react-bootstrap/Spinner"
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../css/manager.css';


class SiteManagerHomepage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            totals: [],
            routes: [],
            weekArr: []
         };
    }

    updateWeek = (week) => {
        console.log(week)
        this.setState({weekArr: week})
    }

    // componentDidUpdate(){
    //     let weekArr = localStorage.getItem("week")
    //     console.log("in update");
    //     console.log(this.state.weeks !== weekArr)
    //     if (weekArr !== '' && (this.state.weeks !== weekArr)) {
    //         this.setState({weeks: weekArr})
    //         console.log(this.state.weeks !== weekArr)
    //     }
    // }

    async componentDidMount(){
        this.fetchMealTotals()
    }

    async fetchMealTotals () {
        let info = {
            site: "SLO",
        }
        let response = await fetch(env.backendURL + 'clients/siteTotals', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(info)
        })
        const data = await response.json();
        this.setState({totals: data.meals, routes: data.routes})
    }

    render() {
        console.log("render site manager homepg")
        let {totals, routes, weekArr} = this.state
        // ignore: <MealTotals data={totals} routes={routes} week={week}/> 
        return (
            <div className="site-manager-page">
                <h1 className="site-manager-page-header">Site Manager Overview</h1>
                <div>
                    <RoutesNavbar routes={this.state.routes} updateWeek={this.updateWeek}/>
                    <div className="site-manager-container">
                        {this.state.totals.length >= 10 ? <MealTotals data={totals} routes={routes} weekArr={weekArr}/> : 
                        <div>
                            <Spinner animation="border" role="status" />
                        </div>}
                    </div>
                </div>
            </div>
        );
    }
}

export default SiteManagerHomepage;