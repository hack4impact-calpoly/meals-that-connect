import React, { Component } from 'react';
import MealTotals from './mealTotals';
import RoutesNavbar from './RoutesNavbar';
import PopupMealTotals from './PopupMealTotals';
import env from "react-dotenv";
import { HashLink as Link } from "react-router-hash-link";
import 'reactjs-popup/dist/index.css';

import Spinner from "react-bootstrap/Spinner"
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../css/manager.css'

import * as html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

class SiteManagerHomepage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            totals: null,
            routes: []
         };
    }

    async componentDidMount(){
        this.fetchMealTotals()
    }

    async fetchMealTotals () {
        let info = {
            site: "SLO",
        }
        let response = await fetch(env.backendURL + 'clients/siteTotals', {
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
        let {totals, routes} = this.state
        console.log(this.state.totals)
        return (
            <div className="site-manager-page">
                <h1 className="site-manager-page-header">Site Manager Overview</h1>
                <div className="site-manager-container">
                    <RoutesNavbar routes={this.state.routes}/>
                    <div>
                        {this.state.totals ? <div id="meal-totals"><MealTotals data={totals} routes={routes}/></div> : 
                        <div>
                            <Spinner animation="border" role="status" />
                        </div>}
                        <button className="print-meals" onClick={this.printDocument}>Print Meal Totals</button>
                        <PopupMealTotals />
                    </div>
                </div>
            </div>
        );
    }
}

export default SiteManagerHomepage;