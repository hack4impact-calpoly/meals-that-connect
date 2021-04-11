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
            totals: [],
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
    
        html2canvas(input)
        .then((canvas) => {
            console.log('here')
            const imgData = canvas.toDataURL('image/png');
            console.log(imgData)
            const pdf = new jsPDF();
            pdf.addImage(canvas, 'JPEG', 2, 10, 180, 200);
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
                <div className="mb5">
                    <button onClick={this.printDocument}>Print</button>
                </div>
                <div>
                    <RoutesNavbar routes={this.state.routes}/>
                    <div className="site-manager-container" id="site-manager-container">
                        {this.state.totals.length >= 10 ? <MealTotals data={totals} routes={routes}/> : 
                        <div>
                            <Spinner animation="border" role="status" />
                        </div>}
                    </div>
                </div>
            </div>
        );
    }
}

export default SiteManagerHomepage;