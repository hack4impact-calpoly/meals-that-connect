import React, { Component } from 'react';
import '../../css/routesNavbar.css';
import { HashLink as Link } from "react-router-hash-link";
import Calendar from './calendar';

class routesOverview extends Component {

    constructor(props) {
        super(props);
        this.state = { isSticky: false};
    }

    render() {
        let routes = this.props.routes
        return (
            <div id="route-sidebar">
                <Calendar/>
                <h1><b>Routes</b></h1>
                <hr></hr>
                <nav className="route-links">
                    <Link to="/">
                        <button type="button" className="route">Overview</button>
                    </Link><br/>
                    <hr></hr>
                    {routes.map((route, i) =>{
                        return (
                            <Link to={"routes#"+route}>
                                <button type="button" className="route">Route {route}</button>
                            </Link>
                    );})}
                </nav>
            </div>
        );
    }
}

export default routesOverview;
