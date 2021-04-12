import React, { Component } from 'react';
import MealTotals from './mealTotals';
import RoutesNavbar from './RoutesNavbar';
import env from "react-dotenv";

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
        const input = document.getElementById('site-manager-container');
    
        html2canvas(input, {scrollY: -window.scrollY})
        .then((canvas) => {
            const imgData = canvas.toDataURL('image/png');

            var sideMargin = 5;
            var imgWidth = 200;
            var pageHeight = 266;
            var imgHeight = canvas.height * imgWidth /canvas.width;
            var heightLeft = imgHeight;

            var pdf = new jsPDF('p', 'mm');
            var position = 5;

            pdf.addImage(imgData, 'JPEG', sideMargin, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;

            while (heightLeft >= 0) {
                position  += heightLeft - imgHeight;
                pdf.addPage();
                pdf.addImage(imgData, 'JPEG', sideMargin, position, imgWidth, imgHeight);
                heightLeft -= pageHeight;
            }

            pdf.save("RouteOverview.pdf");
        });
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
                        {this.state.totals ? <div id="site-manager-container"><MealTotals data={totals} routes={routes}/></div> : 
                        <div>
                            <Spinner animation="border" role="status" />
                        </div>}
                        <button className="print-meals" onClick={this.printDocument}>Print Meal Totals</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default SiteManagerHomepage;