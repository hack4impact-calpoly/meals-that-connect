import React, { Component } from 'react';
import { Link } from "react-router-dom";

class DataEntryNavBar extends Component {
    render() {
        return (
            <div className = "navbar">
                <h2>Meals that Connect</h2>
                    <Link className="navbar-link" to="/" style={{marginLeft : '100px'}}>Home</Link>
                    <Link className="navbar-link" to="/profile">
                        <img src = "https://static.thenounproject.com/png/3070444-200.png" style={{height: '35px'}}/>
                    </Link>
            </div>
        );
    }
}

export default DataEntryNavBar;