import React, { Component } from 'react';
import Modal from 'react-modal';
import MealTotals from './routes/mealTotals';
import RoutesNavbar from './routes/RoutesNavbar';
import PopupMealTotals from './routes/PopupMealTotals';
import 'reactjs-popup/dist/index.css';

import Spinner from "react-bootstrap/Spinner"
import { getWeekArr } from './calendar'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../css/manager.css';


import * as html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

const moment = require('moment')

class SiteManagerHomepage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            totals: null,
            routes: [],
            weekArr: [],
            holidayArr: [],
            clients: {},
         };
    }

    updateWeek = (week) => {
        console.log("Updating week")
        this.state.weekArr = week
        // this.setState({weekArr: week})
        this.fetchMealTotals()
    }

    updateHoliday = (holidays) => {
        this.setState({holidayArr: holidays})
    }

    async componentDidMount(){
        await this.fetchMealTotals()
    }

    async fetchMealTotals () {
        // var mondayDate = getWeekArr(new Date)[1]
        if (this.state.weekArr.len === 0) {
            return
        }
        let mondayDate = this.state.weekArr[1];
        console.log(mondayDate)
        let info = {
            site: "SLO",
            week: mondayDate
        }
        let response = await fetch(process.env.REACT_APP_SERVER_URL + 'meals/siteTotals', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(info)
        })
        const data = await response.json();
        this.setState({totals: data.totals, routes: data.routes})
        console.log(this.state.totals)
    }

    // grabs the sorted list of clients by route and index based on site and day
    async fetchRouteOverview(site, day) {
        let param = {
            site: site,
            day: day
        }
        // call to mongodb backend function
        let response = await fetch(process.env.REACT_APP_SERVER_URL + 'meals/routeOverviewDay', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(param)
        })

        const clients = await response.json();
        console.log(clients)
        return clients
    }
    // data isn't right there is a lot of data missing for this page to be created
    async printDocument(site, day) {
        
        let clients = await this.fetchRouteOverview(site, day)
        var doc = new jsPDF()


        for (let i = 0; i < clients.length; i++) {
            // add header
            var date = "5/21/2021"
            doc.setFontSize(20);
            doc.text("Route " + clients[i] + ", Mon, " + date, 15, 15);

            doc.setFontSize(10);
            doc.text("If a problem arises, call: Jesse 805-235-8864", 15, 22);

            //Totals Header need to calculate totals before hand
            doc.cell(121, 23, 17, 7, "Totals:")
            doc.cell(138, 23, 15, 7, "  " + 1)
            doc.cell(153, 23, 13, 7, "  " + 20)
            doc.cell(166, 23, 13, 7, "  " + 20)
            doc.cell(179, 23, 16, 7, "  " + 20)

            // Header of the Route
            doc.cell(15, 30, 16, 17, "Stop\n #")
            doc.cell(31, 30, 37, 17, "          Name")
            doc.cell(68, 30, 44, 17, "             Address")
            doc.cell(112, 30, 26, 17, "     Phone")
            doc.cell(138, 30, 15, 17, "Froz?")
            doc.cell(153, 30, 13, 17, "Wht\nBag")
            doc.cell(166, 30, 13, 17, "Bwn\nBag")
            doc.cell(179, 30, 16, 17, " Num\n   of\nMeals")

            // iterate through clients with the same route
            var y = 48
            var x = 15
            for (let j = 0; j < clients[i].length; j++) {
                // add stop number
                doc.cell(x, y, 16, 21, "\n" + j + 1)
                doc.setFontSize(8)
                doc.cell(x + 16, y, 37, 7, clients[i][j].firstName + " " + clients[i][j].lastName)
                doc.cell(x + 16, y + 7, 164, 7, "Emergency Contact: " + clients[i][j].emergencyContact + ", " + clients[i][j].emergencyPhone)
                doc.cell(x + 16, y + 14, 164, 7, "Special Instructions: " + clients[i][j].specialInstructions)

                doc.cell(x + 53, y, 44, 7, clients[i][j].address)
                
                // get phone number here
                doc.cell(x + 97, y, 26, 7, clients[i][j].phoneNumber)
                let frozenNum = 0
                var count = 0
                if (clients[i][j].frozenDay.localeCompare(day) === 0) {
                    frozenNum = clients[i][j].frozenNumber
                }
                doc.cell(x + 123, y, 15, 7, "   " + frozenNum)
                //Wht Bag
                doc.cell(x + 138, y, 13, 7, "   " + clients[i][j].whtBag)
                //bwn Bag
                doc.cell(x + 138, y, 13, 7, "   " + clients[i][j].bwnBag)
                // num of meals. 
                doc.cell(x + 138, y, 13, 7, "   " + clients[i][j].numOfMeals)

                count += 1;
                // if 10 rows already made create a new page
                if (count >= 10) {
                    count = 0
                    // account for new page spacing 
                    y = 15
                    doc.newPage()
                } else {
                    y += 22
                }
                
            }
            doc.newPage()
        }
        doc.output('dataurlnewwindow')
    }

    handleOpenModal = () => {
        this.setState({showModal: true});
    }
    
    handleCloseModal = () => {
        this.setState({showModal: false});
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
                        <div className = "confirmation-buttons" style={{ display:'flex', marginTop: 20}}>
                            <h3>Confirm Total For: </h3>
                            <PopupMealTotals weekArr= {weekArr} day={0} showModal={this.handleOpenModal}/>
                            <PopupMealTotals weekArr= {weekArr} day={1} showModal={this.handleOpenModal}/>
                            <PopupMealTotals weekArr= {weekArr} day={2} showModal={this.handleOpenModal}/>
                            <PopupMealTotals weekArr= {weekArr} day={3} showModal={this.handleOpenModal}/>
                            <PopupMealTotals weekArr= {weekArr} day={4} showModal={this.handleOpenModal}/>
                        </div>
                        <button className="route" style={{marginTop: 20,width: 300}} onClick={() => this.printDocument("SLO", "M")}>Print Meal Totals</button>
                    </div>
                    <Modal isOpen={this.state.showModal} className="order-modal" overlayClassName="Overlay">
                        <div id="order-modal-header">
                            <h1>Successfully Submitted Order!</h1>
                            <button onClick={this.handleCloseModal} id="order-modal-button">Close</button>
                        </div>
                    </Modal>
                </div>
            </div>
        );
    }
}

export default SiteManagerHomepage;
