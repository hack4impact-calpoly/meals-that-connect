import React, { Component } from 'react';
import env from "react-dotenv";
import SiteManagerHomepage from './sitemanager/SiteManagerHomepage.js'
import DataEntryHome from './dataEntryHome.js'
import LogHours from './LogHours.js'
import Home from './homepage/Home'


class HomepageWrapper extends Component {
    constructor(props) {
        super(props);
        this.state = { userType: localStorage.getItem('userType')};
    }

    render() {
        let homePage;
        if (this.state.userType === 'site-manager')
        {
            homePage = <SiteManagerHomepage />
        }
        else if (this.state.userType === 'data-entry')
        {
            homePage = <DataEntryHome />
        }
        else
        {
            homePage = <LogHours />
        }

        return (
            <div>
                {homePage}
            </div>
        );
    }
}

export default HomepageWrapper;