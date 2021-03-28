import React, { Component } from 'react';
import { Link } from "react-router-dom";

class DataVolunteerNavBar extends Component {
    render() {
        return (
            <div className = "navbar">
                <h2>Meals that Connect</h2>
                    <Link className="navbar-link" to="/signout">
                        <img src = "https://static.thenounproject.com/png/3070444-200.png" style={{height: '35px', marginLeft : '300px'}}/>
                    </Link>
            </div>
        );
    }
}

export default DataVolunteerNavBar;