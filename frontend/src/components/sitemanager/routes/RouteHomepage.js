import React, { Component } from 'react';
import RouteTable from './RouteTable';
import env from "react-dotenv";
import Modal from 'react-modal';
import RoutesNavbar from './RoutesNavbar';
import '../../../css/Modal.css';

class RouteHomepage extends Component {
    constructor(props) {
        super(props);
        this.state = {  
            clients: {},
            routes: [],
            showModal: false,
            holidayArr: [],
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
                routes.push(prevRoute)
                routeData = []
            }
            prevRoute = client.routeNumber
            routeData.push(client)
        }
        if (routeData.length > 0) {
            clients[prevRoute] = routeData
            routes.push(prevRoute)
        }
        this.setState({clients: clients, routes: routes}) 
    }

    setData = (data, route) => {
        let newClients = this.state.clients
        newClients[route] = data
        this.setState({clients: newClients})
    }

    updateWeek = (week) => {
        console.log(week)
        this.setState({weekArr: week})
    }

    handleOpenModal = (currentClient) => {
        this.setState({showModal: true, currentClient: currentClient});
    }
    
    handleCloseModal = () => {
        this.setState({showModal: false});
    }

    render() {
        let {routes, clients} = this.state;
        let currentClient = this.state.currentClient;
        return (
            <div style={{marginBottom: 40}}>
                <RoutesNavbar routes={routes} fixed={true} updateWeek={this.updateWeek} updateHoliday={this.updateHoliday}/>
                <h1 className="site-manager-page-header">Routes Page</h1>
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
                    <Modal isOpen={this.state.showModal} contentLabel="Minimal Modal Example">
                        <div>
                            <div id="client-info-header">
                                <h1>Client Information</h1>
                                <button onClick={this.handleCloseModal} style={{position: "fixed"}}>Close Modal</button>
                            </div>
                            <div id="client-info-body">
                                <div>
                                    <label for="client-firstname">First Name</label>
                                    <label for="client-lastname" className="secondColumn-text">Last Name</label>
                                </div>
                                <div>
                                    <input type="text" value={currentClient["firstName"]} id="client-firstname"/>
                                    <input type="text" value={currentClient["lastName"]} id="client-lastname" className="secondColumn-input"/><br/>
                                </div>
                                <label for="client-address">Address</label><br/>
                                <input type="text" value={currentClient["address"]} id="client-address"/>
                                <div>
                                    <label for="client-mealnumber">Num. of Meals</label><br/>
                                    <input type="text" value={currentClient["mealNumber"]} id="client-mealnumber"/><br/>

                                    <p>Food Days</p>

                                    <label for="client-foodday-m">Monday</label><br/>
                                    <input type="checkbox" checked={currentClient["foodDays"]["M"]} id="client-foodday-m"/><br/>

                                    <label for="client-foodday-t">Tuesday</label><br/>
                                    <input type="checkbox" checked={currentClient["foodDays"]["T"]} id="client-foodday-t"/><br/>

                                    <label for="client-foodday-w">Wednesday</label><br/>
                                    <input type="checkbox" checked={currentClient["foodDays"]["W"]} id="client-foodday-w"/><br/>

                                    <label for="client-foodday-th">Thursday</label><br/>
                                    <input type="checkbox" checked={currentClient["foodDays"]["Th"]} id="client-foodday-th"/><br/>

                                    <label for="client-foodday-f">Friday</label><br/>
                                    <input type="checkbox" checked={currentClient["foodDays"]["F"]} id="client-foodday-f"/><br/>

                                </div>
                                <div>
                                    <label for="client-frozenNumber">Number of Frozen Meals</label><br/>
                                    <input type="number" value={currentClient["frozenNumber"]} id="client-frozenNumber"/><br/>

                                    <p>Frozen Days</p>

                                    <label for="client-frozenday-m">Monday</label><br/>
                                    <input type="checkbox" checked={currentClient["frozenDay"]["M"]} id="client-frozenday-m"/><br/>

                                    <label for="client-frozenday-t">Tuesday</label><br/>
                                    <input type="checkbox" checked={currentClient["frozenDay"]["T"]} id="client-frozenday-t"/><br/>

                                    <label for="client-frozenday-w">Wednesday</label><br/>
                                    <input type="checkbox" checked={currentClient["frozenDay"]["W"]} id="client-frozenday-w"/><br/>

                                    <label for="client-frozenday-th">Thursday</label><br/>
                                    <input type="checkbox" checked={currentClient["frozenDay"]["Th"]} id="client-frozenday-th"/><br/>

                                    <label for="client-frozenday-f">Friday</label><br/>
                                    <input type="checkbox" checked={currentClient["frozenDay"]["F"]} id="client-frozenday-f"/><br/>

                                </div>

                                <label for="client-phone">Phone Number</label><br/>
                                <input type="text" value={currentClient["phoneNumber"]} id="client-phone"/><br/>

                                <label for="client-emergencycontact">Emergency Contact</label><br/>
                                <input type="text" value={currentClient["emergencyContact"]} id="client-emergencycontact"/><br/>

                                <label for="client-emergencyphone">Emergency Contact Phone</label><br/>
                                <input type="text" value={currentClient["emergencyPhone"]} id="client-emergencyphone"/><br/>

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
