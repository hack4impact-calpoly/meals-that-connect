import React, { Component } from 'react';
import MealTotals from './mealTotals';
import RoutesOverview from './routesOverview';
import './../css/manager.css'

class SiteManagerHomepage extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    render() {
        return (
            <div id="overview">
                <h1 id="site-manager-header">Site Manager Overview</h1>
                <div id="main">
                    <RoutesOverview/>
                    <MealTotals/>
                </div>
            </div>
        );
    }
}

export default SiteManagerHomepage;