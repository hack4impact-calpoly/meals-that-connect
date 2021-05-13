import React, { Component } from 'react';
import '../../../css/routesNavbar.css';
import { HashLink as Link } from "react-router-hash-link";
import Calendar from '../calendar';

class routesOverview extends Component {

    constructor(props) {
        super(props);
        this.state = { isSticky: false};
        this.scrollWidthOffset = this.scrollWidthOffset.bind(this)
    }

    scrollWidthOffset = (el) => {
        const yCoordinate = el.getBoundingClientRect().top + window.pageYOffset;
        const yOffset = -150; 
        window.scrollTo({ top: yCoordinate + yOffset }); 
    }

    render() {
        let routes = this.props.routes
        let fixed = this.props.fixed
        let scroll = this.scrollWidthOffset

        return (
            <div id="route-sidebar" style={fixed ? {position: 'fixed', marginTop: 150, maxHeight: '85vh' } : {height: '100%'}}>
                <Calendar updateWeek={this.props.updateWeek} updateHoliday={this.props.updateHoliday}/>
                <h1 style={{width: 250}}><b>Routes</b></h1>
                <hr></hr>
                <nav className="route-links">
                    <Link to="/">
                        <button type="button" className="route">Overview</button>
                    </Link><br/>
                    <hr></hr>
                    {routes.map((route, i) =>{
                        return (
                            <Link scroll={(el) => scroll(el)} to={"routes#"+route}>
                                <button type="button" className="route">Route {route}</button>
                            </Link>
                    );})}
                </nav>
            </div>
        );
    }
}

export default routesOverview;
