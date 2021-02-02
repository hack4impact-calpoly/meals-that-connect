import React, { Component } from 'react';
import FrontBanner from './FrontBanner.js';
import Columns from './Columns.js'

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = { 

        };
    }
    render() {
        return (
            <main>
            <FrontBanner />
            <Columns />
            </main>
        );
    }
}

export default Home;