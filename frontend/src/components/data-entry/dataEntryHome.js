import React, { Component } from 'react';
import SiteManagerHomepage from '../sitemanager/SiteManagerHomepage.js'

class DataEntryHome extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        return (
            <div>
                <SiteManagerHomepage />
            </div>
        );
    }
}

export default DataEntryHome;