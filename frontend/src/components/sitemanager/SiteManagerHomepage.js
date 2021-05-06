import React, { Component } from 'react';
import MealTotals from './routes/mealTotals';
import RoutesNavbar from './routes/RoutesNavbar';
import PopupMealTotals from './routes/PopupMealTotals';
import 'reactjs-popup/dist/index.css';

import Spinner from "react-bootstrap/Spinner"
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../css/manager.css';


import * as html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

const moment = require('moment')

class SiteManagerHomepage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            totals: null,
            routes: [],
            weekArr: [],
            holidayArr: []
         };
    }

    updateWeek = (week) => {
        console.log(week)
        console.log("here")
        this.setState({weekArr: week})
        this.fetchMealTotals()
    }

    updateHoliday = (holidays) => {
        console.log(holidays)
        this.setState({holidayArr: holidays})
    }

    async componentDidMount(){
        this.fetchMealTotals()
    }

    async fetchMealTotals () {
        var currWeek = moment();
        if (typeof this.state.weekArr !== 'undefined') {
            currWeek = this.state.weekArr;
        }
        let info = {
            site: "SLO",
            week: currWeek
        }
        let response = await fetch(process.env.REACT_APP_SERVER_URL + 'meals/siteTotals', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(info)
        })
        const data = await response.json();
        this.setState({totals: data.meals, routes: data.routes})
    }

    printDocument() {
        const input = document.getElementById('meal-totals')
        console.log(input.height)
        
        console.log(input);
    
        html2canvas(input)
        .then((canvas) => {
            console.log('here')
            const imgData = canvas.toDataURL('image/png');
            console.log(imgData)
            const pdf = new jsPDF();
            pdf.addImage(canvas, 'JPEG', 2, 10, 180, 220);
            pdf.output('dataurlnewwindow');
            pdf.save("download.pdf");
        })
        ;
    }

    render() {
        let {totals, routes, weekArr, holidayArr} = this.state
        return (
            <div className="site-manager-page">
                <h1 className="site-manager-page-header">Site Manager Overview</h1>
                <div className="site-manager-container">
                    <RoutesNavbar routes={this.state.routes} updateWeek={this.updateWeek} updateHoliday={this.updateHoliday}/>
                    <div>
                        {this.state.totals ? <div id="meal-totals"><MealTotals data={totals} routes={routes} weekArr={weekArr} holidayArr={holidayArr}/></div> : 
                        <div>
                            <Spinner animation="border" role="status" />
                        </div>}
                        <div className = "confirmation-buttons" style={{ display:'flex'}}>
                            <h3>Confirm Total For:</h3>
                            <PopupMealTotals day={0}/>
                            <PopupMealTotals day={1}/>
                            <PopupMealTotals day={2}/>
                            <PopupMealTotals day={3}/>
                            <PopupMealTotals day={4}/>
                        </div>
                        <button className="route" style={{marginTop: 20,width: 300}} onClick={this.printDocument}>Print Meal Totals</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default SiteManagerHomepage;
