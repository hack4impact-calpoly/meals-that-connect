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
            site: localStorage.getItem("site")
         };
    }

    updateWeek = (week) => {
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
        let info = {
            site: this.state.site,
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
    }

    // grabs the sorted list of clients by route and index based on site and day
    async fetchRouteOverview(dayString) {
        let Date = this.state.weekArr[1];
        let param = {
            site: this.state.site,
            day: dayString,
            week: Date
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
        //console.log(clients)
        return clients
    }
    
    async printDocument(dayString, day) {
        
        let clients = await this.fetchRouteOverview(dayString)
        var doc = new jsPDF()
        //console.log(clients)
        // Sorry! clean this up to be better
        let abbrev = 'Mon'
        if (dayString === 'T')
            abbrev = 'Tues'
        else if (dayString === 'W')
            abbrev = 'Wed'
        else if (dayString === 'Th')
            abbrev = 'Thurs'
        else if (dayString === 'F')
            abbrev = 'Fri'

        for (let i = 0; i < clients.length; i++) {
            doc.setFontSize(18);
            doc.text("Route " + clients[i][0].routeNumber + ", " + abbrev + ", " + this.getDate(this.state.weekArr, day), 15, 15);

            doc.setFontSize(10);
            doc.text("If a problem arises, call: Jesse 805-235-8864", 15, 22);

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
            var fTotal = 0
            var wTotal = 0
            var bTotal = 0
            var nTotal = 0
            // get totals for the route
            for (let k = 0; k < clients[i].length; k++) {
                if (clients[i][k].frozenDay.localeCompare(dayString) === 0) {
                    fTotal += clients[i][k].frozenNumber
                }
                if (clients[i][k].noMilk)
                    wTotal += 1
                else 
                    bTotal += 1
                nTotal += 1
            }

             // Totals Header need to calculate totals before hand
            doc.cell(121, 23, 17, 7, "Totals:")
            doc.cell(138, 23, 15, 7, "  " + fTotal)
            doc.cell(153, 23, 13, 7, "  " + wTotal)
            doc.cell(166, 23, 13, 7, "  " + bTotal)
            doc.cell(179, 23, 16, 7, "  " + nTotal)

            var y = 48
            var x = 15
            for (let j = 0; j < clients[i].length; j++) {
                // add stop number
                var stopNum = j + 1
                doc.setFontSize(10)
                doc.cell(x, y, 16, 21, "\n" + stopNum)
                doc.setFontSize(8)
                doc.cell(x + 16, y, 37, 9, clients[i][j].firstName + " " + clients[i][j].lastName)
                doc.cell(x + 16, y + 9, 164, 6, "Emergency Contact: " + clients[i][j].emergencyContact + ", " + clients[i][j].emergencyPhone)
                doc.cell(x + 16, y + 15, 164, 6, "Special Instructions: " + clients[i][j].specialInstructions)
                doc.setFontSize(6.5)
                doc.cell(x + 53, y, 44, 9, clients[i][j].address)
                doc.setFontSize(8)
                // get phone number here
                doc.cell(x + 97, y, 26, 9, clients[i][j].phoneNumber)

                let frozenNum = 0
                var count = 0
 
                if (clients[i][j].frozenDay.localeCompare(dayString) === 0) 
                    frozenNum = clients[i][j].frozenNumber
                

                doc.cell(x + 123, y, 15, 9, "   " + frozenNum)

                // get WhtBag or Bwn Bag
                var whtBag = 0
                var bwnBag = 0
                // if noMilk is true
                if (clients[i][j].noMilk)
                    whtBag = 1
                else 
                    bwnBag = 1

                //Wht Bag
                doc.cell(x + 138, y, 13, 9, "   " + whtBag)
                //bwn Bag
                doc.cell(x + 151, y, 13, 9, "   " + bwnBag)
                // num of meals of hot meals is always 1 for each client
                doc.cell(x + 164, y, 16, 9, "   " + 1)
                count += 1;

                // if 10 rows already made create a new page
                if (count >= 10) {
                    count = 0
                    // account for new page spacing 
                    y = 15
                    doc.addPage()
                } else {
                    y += 22
                }
                
            }

            if (i < clients.length -1)
                doc.addPage()
        }
        doc.output('dataurlnewwindow')
    }

    getDate(weekArr, tableDay) {
        //let weekArr = props.weekArr
        let curr;
        if (weekArr.length === 1)
        {
          curr = new Date();
        }
        else
        {
          curr = new Date(weekArr[0]);
        }
        let week = [];
      
        for (let i = 1; i <= 7; i++) {
          let first = curr.getDate() - curr.getDay() + i;
          let day = new Date(curr.setDate(first));
          let month = day.getMonth() + 1;
          let date = day.getDate();
          let year = day.getFullYear();
          let mdy = month + "/" + date + "/" + year;
          week.push(mdy);
        }
        return week[tableDay];
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
                <h1 className="site-manager-page-header"> { (localStorage.getItem("userType") == "site-manager") ? "Site Manager Overview" : "Data Entry Homepage" }</h1>
                <div className="site-manager-container">
                    <RoutesNavbar routes={this.state.routes} updateWeek={this.updateWeek} updateHoliday={this.updateHoliday}/>
                    <div>
                        {this.state.totals ? <div id="meal-totals"><MealTotals data={totals} routes={routes} weekArr={weekArr} holidayArr={holidayArr}/></div> : 
                        <div id = "spin">
                            <Spinner animation="border" role="status" style={{width:'70px', height:'70px', left: '50%', right: '40%', top: '40%', display: 'block', position:'absolute'}}/>
                        </div>}

                        <div className = "confirmation-buttons" style={{ display:'flex', marginTop: 20, display: 'none'}} >
                        { (localStorage.getItem("userType") == "site-manager") ? <h3 style={{width: 200}}>Confirm Total: </h3> : null }
                        { (localStorage.getItem("userType") == "site-manager") ?  <PopupMealTotals weekArr= {weekArr} day={0} showModal={this.handleOpenModal}/> : null }
                        { (localStorage.getItem("userType") == "site-manager") ?  <PopupMealTotals weekArr= {weekArr} day={1} showModal={this.handleOpenModal}/> : null }
                        { (localStorage.getItem("userType") == "site-manager") ?  <PopupMealTotals weekArr= {weekArr} day={2} showModal={this.handleOpenModal}/> : null }
                        { (localStorage.getItem("userType") == "site-manager") ?  <PopupMealTotals weekArr= {weekArr} day={3} showModal={this.handleOpenModal}/> : null }
                        { (localStorage.getItem("userType") == "site-manager") ?  <PopupMealTotals weekArr= {weekArr} day={4} showModal={this.handleOpenModal}/> : null }
                        </div>
                        <div className = "confirmation-buttons" style={{ display:'flex', marginTop: 20}}>
                            <h3 style={{width: 200}}>Driver Routes: </h3>
                            <button className="route" style={{width: 165}} onClick={() => this.printDocument("M", 0)}>Monday</button>
                            <button className="route" style={{width: 165}} onClick={() => this.printDocument("T", 1)}>Tuesday</button>
                            <button className="route" style={{width: 165}} onClick={() => this.printDocument("W", 2)}>Wednesday</button>
                            <button className="route" style={{width: 165}} onClick={() => this.printDocument("Th", 3)}>Thursday</button>
                            <button className="route" style={{width: 165}} onClick={() => this.printDocument("F", 4)}>Friday</button>
                        </div>
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
