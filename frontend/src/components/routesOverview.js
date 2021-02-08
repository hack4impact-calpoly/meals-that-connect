import React, { Component } from 'react';
import '../css/routesOverview.css';
import { HashLink as Link } from "react-router-hash-link";

class routesOverview extends Component {

    constructor(props) {
        super(props);
        this.state = { };
    }

    render() {
        return (
            <div id="route-sidebar">
                <p id="route-title"><b>Routes Overview</b></p>
                <hr/>
                <nav className="route-links">
                    <Link to="routes#1">
                        <button type="button" className="route">Route 1</button>
                    </Link><br/>
                    <Link to="routes#2">
                        <button type="button" className="route">Route 2</button>
                    </Link><br/>
                    <Link to="routes#3">
                        <button type="button" className="route">Route 3</button>
                    </Link><br/>
                    <Link to="routes#4">
                        <button type="button" className="route">Route 4A</button>
                    </Link><br/>
                    <Link to="routes#4">
                        <button type="button" className="route">Route 4B</button>
                    </Link><br/>
                    <Link to="routes#5">
                        <button type="button" className="route">Route 5</button>
                    </Link><br/>
                    <Link to="routes#6">
                        <button type="button" className="route">Route 6</button>
                    </Link><br/>
                    <Link to="routes#7">
                        <button type="button" className="route">Route 7</button>
                    </Link><br/>
                    <Link to="routes#8">
                        <button type="button" className="route">Route 8</button>
                    </Link><br/>
                    <Link to="routes#9">
                        <button type="button" className="route">Route 9</button>
                    </Link>
                </nav>
            </div>
        );
    }
}

export default routesOverview;
