import React, { Component } from 'react';
import '../css/routesOverview.css';
import { Link } from "react-router-dom";

class routesOverview extends Component {

    constructor(props) {
        super(props);
        this.state = { isSticky: false};
    }

    render() {
        return (
            <div id="route-sidebar">
                <p><b>Routes Overview</b></p>
                <hr></hr>
                <div className="route-links">
                    <Link to="/routes">
                        <button type="button" className="route">Route 1</button><br/>
                    </Link>
                    <Link to="/routes">
                        <button type="button" className="route">Route 2</button>
                    </Link><br/>
                    <Link to="/routes">
                        <button type="button" className="route">Route 3</button>
                    </Link><br/>
                    <Link to="/routes">
                        <button type="button" className="route">Route 4A</button>
                    </Link><br/>
                    <Link to="/routes">
                        <button type="button" className="route">Route 4B</button>
                    </Link><br/>
                    <Link to="/routes">
                        <button type="button" className="route">Route 5</button>
                    </Link><br/>
                    <Link to="/routes">
                        <button type="button" className="route">Route 6</button>
                    </Link><br/>
                    <Link to="/routes">
                        <button type="button" className="route">Route 7</button>
                    </Link><br/>
                    <Link to="/routes">
                        <button type="button" className="route">Route 8</button>
                    </Link><br/>
                    <Link to="/routes">
                        <button type="button" className="route">Route 9</button>
                    </Link>
                </div>
            </div>
        );
    }
}

export default routesOverview;
