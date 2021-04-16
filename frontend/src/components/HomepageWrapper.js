import React, { Component } from 'react';
import SiteManagerHomepage from './sitemanager/SiteManagerHomepage.js'
import DataEntryHome from './data-entry/dataEntryHome.js'
import LogHours from './volunteer/LogHours.js'


class HomepageWrapper extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: localStorage.getItem('isLoggedIn'), 
            userType: localStorage.getItem('userType')
        };
    }

    render() {
        let homePage, navbar;
        
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