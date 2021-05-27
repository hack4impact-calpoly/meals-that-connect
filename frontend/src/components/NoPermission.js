import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class NoPermission extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        return (
            <div>
                <h1 style={{paddingTop: "150px", paddingBottom: 20}}>Error: You don't have permission to access this page!</h1>
                <Link to="/">
                    <button className="generic-button">Click to go back to homepage</button>
                </Link><br/>
            </div>
        );
    }
}

export default NoPermission;