import React, { Component } from 'react';
import env from "react-dotenv";
import DataVolunteerNavBar from './DataVolunteerNavBar'
import SiteManagerNavBar from './sitemanager/SiteManagerNavBar'
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
        let homePage, navbar;
        if (this.state.userType === 'site-manager')
        {
            navbar = <SiteManagerNavBar />
            homePage = <SiteManagerHomepage />
        }
        else if (this.state.userType === 'data-entry')
        {
            navbar = <DataVolunteerNavBar />
            homePage = <DataEntryHome />
        }
        else
        {
            navbar = <DataVolunteerNavBar />
            homePage = <LogHours />
        }

        return (
            <div>
                {navbar}
                {homePage}
            </div>
        );
    }
}

export default HomepageWrapper;