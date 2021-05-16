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
        })
        ;
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
                        <div>
                            <Spinner animation="border" role="status" />
                        </div>}

                        <div className = "confirmation-buttons" style={{ display:'flex', marginTop: 20}}>
                        { (localStorage.getItem("userType") == "site-manager") ? <h3>Confirm Total For: </h3> : null }
                        { (localStorage.getItem("userType") == "site-manager") ?  <PopupMealTotals weekArr= {weekArr} day={0} showModal={this.handleOpenModal}/> : null }
                        { (localStorage.getItem("userType") == "site-manager") ?  <PopupMealTotals weekArr= {weekArr} day={1} showModal={this.handleOpenModal}/> : null }
                        { (localStorage.getItem("userType") == "site-manager") ?  <PopupMealTotals weekArr= {weekArr} day={2} showModal={this.handleOpenModal}/> : null }
                        { (localStorage.getItem("userType") == "site-manager") ?  <PopupMealTotals weekArr= {weekArr} day={3} showModal={this.handleOpenModal}/> : null }
                        { (localStorage.getItem("userType") == "site-manager") ?  <PopupMealTotals weekArr= {weekArr} day={4} showModal={this.handleOpenModal}/> : null }
                        </div>
                        { (localStorage.getItem("userType") == "site-manager") ?  <button className="route" style={{marginTop: 20,width: 300}} onClick={this.printDocument}>Print Meal Totals</button> : null }
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
