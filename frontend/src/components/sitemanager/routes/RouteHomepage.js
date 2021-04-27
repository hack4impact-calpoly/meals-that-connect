import React, { Component } from 'react';
import RouteTable from './RouteTable';
import env from "react-dotenv";
import Modal from 'react-modal';
import RoutesNavbar from './RoutesNavbar';
import "../../../css/Modal.css"

class RouteHomepage extends Component {
    constructor(props) {
        super(props);
        this.state = {  
            clients: {},
            routes: [],
            showModal: false,
            currentClient:  {
                firstName: null,
                lastName: null,
                address: null,
                foodDays: {
                    M: null,
                    T: null,
                    W: null,
                    Th: null,
                    F: null
                },
                frozenNumber: null,
                frozenDay: {
                    M: null,
                    T: null,
                    W: null,
                    Th: null,
                    F: null
                },
                phoneNumber: null,
                emergencyContact: null,
                emergencyPhone: null,
                noMilk: null,
                mealNumber: null,
                specialInstructions: null,
                clientC2: null,
                NE: null,
                email: null,
                holidayFrozen: null,
                routeNumber: null,
                site: null,
                index: null

            }   
        };
    }

    async componentDidMount(){
        await this.fetchClients()
    }
    
    componentWillMount() {
        Modal.setAppElement('body');
    }

    updateHoliday = (holidays) => {
        console.log(holidays)
        this.setState({holidayArr: holidays})
    }

    async fetchClients () {
        let info = {
            site: "SLO",
        }
        let response = await fetch(env.backendURL + 'clients/site', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(info)
        })
        const data = await response.json();
        let clients = {}
        let prevRoute = null
        let routeData = []
        let routes = []
        for (let i = 0; i < data.length; i++) {
            let client = data[i]
            if (i > 0 && client.routeNumber !== prevRoute) {
                clients[prevRoute] = routeData
                // make sure null does not get addded to routes array
                if (prevRoute !== null)
                    routes.push(prevRoute)
                routeData = []
            }
            // filters out clients with unassined route numbers
            if (client.routeNumber !== "-1") {
                prevRoute = client.routeNumber
                routeData.push(client)
            }
        }
        if (routeData.length > 0) {
            clients[prevRoute] = routeData
            routes.push(prevRoute)
        }
        console.log(routes)
        this.setState({clients: clients, routes: routes}) 
    }

    setData = (data, route) => {
        let newClients = this.state.clients
        newClients[route] = data
        this.setState({clients: newClients})
    }

    updateWeek = (week) => {
        this.setState({weekArr: week})
    }

    handleOpenModal = (currentClient) => {
        //this.setState({showModal: true, currentClient: currentClient});
    }
    
    handleCloseModal = () => {
        this.setState({showModal: false});
    }
    
    formatDate = (date) => {
        console.log(date)
        var month = (1 + date.getMonth()).toString();
        var day = date.getDate().toString();
        return month + '/' + day;
      }

    render() {
        let {routes, clients, weekArr} = this.state;
        let currentClient = this.state.currentClient;
        console.log(weekArr)
        console.log(weekArr ? " true" : "false")

        return (
            <div style={{marginBottom: 40}}>
                <RoutesNavbar routes={routes} fixed={true} updateWeek={this.updateWeek} updateHoliday={this.updateHoliday}/>
                <h1 className="site-manager-page-header">{weekArr ? "Routes for " + this.formatDate(weekArr[1]) + " to " + this.formatDate(weekArr[5]) : "Routes Page"}</h1>
                <div className="site-manager-container">
                    <div>
                        {routes.map((route, i) =>{
                            return (
                                <section style={{marginRight: 80, paddingLeft: 320}}>
                                    <a id={String(route)}></a>
                                    <RouteTable routenum={route} data={clients[route]} setData={this.setData} showModal={this.handleOpenModal}></RouteTable>
                                </section>
                        );})}
                    </div>
                    <Modal isOpen={this.state.showModal} onRequestClose={this.handleCloseModal} className="Modal" overlayClassName="Overlay">
                        <div id="modal-content">
                            <div id="client-info-header">
                                <h1>Client Information</h1>
                                <button onClick={this.handleCloseModal} style={{position: "fixed"}}>Save and Exit</button>
                            </div>
                            <div id="client-info-body">
                                <div className="two-column">
                                    <div><label for="client-firstname">First Name</label></div>
                                    <div><label for="client-lastname">Last Name</label></div>
                                    <div><input type="text" value={currentClient["firstName"]} id="client-firstname"/></div>
                                    <div><input type="text" value={currentClient["lastName"]} id="client-lastname"/></div>
                                </div>
                                <label for="client-address">Address</label><br/>
                                <input type="text" value={currentClient["address"]} id="client-address" style={{width: "1130px"}}/><br/>
                                <label for="client-mealnumber">Num. of Meals</label><br/>
                                <input type="text" value={currentClient["mealNumber"]} id="client-mealnumber" style={{width: "1130px"}}/><br/>
                                <label>Food Days</label>
                                <table className="add-table">
                                    <tr>
                                        <th>Monday</th>
                                        <th>Tuesday</th>
                                        <th>Wednesday</th>
                                        <th>Thursday</th>
                                        <th>Friday</th>
                                    </tr>
                                    <tr>
                                        <td><input type="checkbox" checked={currentClient["foodDays"]["M"]} id="client-foodday-m"/></td>
                                        <td><input type="checkbox" checked={currentClient["foodDays"]["T"]} id="client-foodday-t"/></td>
                                        <td><input type="checkbox" checked={currentClient["foodDays"]["W"]} id="client-foodday-w"/></td>
                                        <td><input type="checkbox" checked={currentClient["foodDays"]["Th"]} id="client-foodday-th"/></td>
                                        <td><input type="checkbox" checked={currentClient["foodDays"]["F"]} id="client-foodday-f"/></td>
                                    </tr>
                                </table>
                                <br/>
                                <label for="client-frozenNumber">Number of Frozen Meals</label><br/>
                                <input type="text" value={currentClient["frozenNumber"]} id="client-frozenNumber" style={{width: "1130px"}}/><br/>

                                <label>Frozen Days</label>
                                <table className="add-table">
                                    <tr>
                                        <th>Monday</th>
                                        <th>Tuesday</th>
                                        <th>Wednesday</th>
                                        <th>Thursday</th>
                                        <th>Friday</th>
                                    </tr>
                                    <tr>
                                        <td><input type="radio" checked={currentClient["frozenDay"] === "M"} id="client-frozenday-m"/></td>
                                        <td><input type="radio" checked={currentClient["frozenDay"] === "T"} id="client-frozenday-t"/></td>
                                        <td><input type="radio" checked={currentClient["frozenDay"] === "W"} id="client-frozenday-w"/></td>
                                        <td><input type="radio" checked={currentClient["frozenDay"] === "Th"} id="client-frozenday-th"/></td>
                                        <td><input type="radio" checked={currentClient["frozenDay"] === "F"} id="client-frozenday-f"/></td>
                                    </tr>
                                </table>

                                <label for="client-phone">Phone Number</label><br/>
                                <input type="text" value={currentClient["phoneNumber"]} id="client-phone" style={{width: "1130px"}}/><br/>
                                <div className="two-column">
                                    <div><label for="client-emergencycontact">Emergency Contact</label></div>
                                    <div><label for="client-emergencyphone" className="secondColumn-text">Emergency Contact Phone</label></div>
                                    <div><input type="text" value={currentClient["emergencyContact"]} id="client-emergencycontact"/></div>
                                    <div><input type="text" value={currentClient["emergencyPhone"]} id="client-emergencyphone" className="secondColumn-input"/></div>
                                </div>
                                <label for="client-nomilk">No Milk</label><br/>
                                <input type="checkbox" checked={currentClient["noMilk"]} id="client-nomilk"/><br/>

                                <label for="client-specialinstructions">Special Instructions</label><br/>
                                <input type="text" value={currentClient["specialInstructions"]} id="client-specialinstructions"/><br/>

                                <label for="client-c2">C2 Client</label><br/>
                                <input type="checkbox" checked={currentClient["clientC2"]} id="client-c2"/><br/>

                                <label for="client-ne">N/E</label><br/>
                                <input type="text" value={currentClient["NE"]} id="client-ne"/><br/>

                                <label for="client-email">Email Address</label><br/>
                                <input type="text" value={currentClient["email"]} id="client-email"/><br/>

                                <label for="client-holidayfrozen">Holiday Frozen</label><br/>
                                <input type="checkbox" checked={currentClient["holidayFrozen"]} id="client-holidayfrozen"/><br/>
                            </div>
                        </div>
                    </Modal>
{/* 
            <div style={{marginBottom: 40}}>
            <RoutesNavbar routes={routes} fixed={true}/>
            <h1 className="site-manager-page-header">Routes Page</h1>
            <div className="site-manager-container">
                <div >
                    {routes.map((route, i) =>{
                        return (
                            <section style={{marginRight: 80, paddingLeft: 280}}>
                                <a id={String(route)}></a>
                                <RouteTable routenum={route} data={clients[route]} setData={this.setData}></RouteTable>
                            </section>
                    );})}
                    </div> */}
                </div>
            </div>
           
        );
    }
}


export default RouteHomepage;
