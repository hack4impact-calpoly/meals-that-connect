import React, { Component } from 'react';
import RouteTable from './RouteTable';
import Modal from 'react-modal';
import RoutesNavbar from './RoutesNavbar';
import { getWeekArr } from '../calendar'
import ModalContent from './RouteModal';
import '../../../css/Modal.css';
import { weekdaysMin } from 'moment';

const moment = require('moment')

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
                frozenDay: null,
                phoneNumber: null,
                emergencyContact: null,
                emergencyPhone: null,
                noMilk: null,
                specialInstructions: null,
                clientC2: null,
                NE: null,
                email: null,
                holidayFrozen: null,
                routeNumber: null,
                site: null,
                index: null,
                _id: null
            }   
        };
    }

    // async componentDidMount(){
    //     await this.fetchRoutes()
    // }
    
    componentWillMount() {
        Modal.setAppElement('body');
    }

    updateHoliday = (holidays) => {
        this.setState({holidayArr: holidays})
    }

    async fetchRoutes () {
        var mondayDate = getWeekArr(new Date)[1]
        if (typeof this.state.weekArr !== 'undefined') {
            mondayDate = this.state.weekArr[1];
        }
        let info = {
            site: localStorage.getItem("site"),
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
        this.setState({clients: data.meals, routes: data.routes}) 
    }

    setData = (data, route) => {
        let newClients = this.state.clients
        newClients[route] = data
        this.setState({clients: newClients})
    }

    handleChange = (route, key, value, index) => {
        console.log("Handling change")
        let data = this.state.clients[route][index]
        data[key] = value
        this.setState({})
    }

    handleSelect = (route, key, value, index) => {
        console.log("Handling select change")
        let data = this.state.clients[route][index]
        data[key] = value
        this.setState({})
        this.updateDatabase(data.startDate, data.clientID, key, value)
    }

    handleBoolChange = (route, key, value, day, index) => {
        console.log("Handling checkbox change")
        let data = this.state.clients[route][index]
        if (day !== null) {
            data[key][day] = value
            value = data[key]
        }
        else {
            data[key] = value
        }
        this.setState({})
        this.updateDatabase(data.startDate, data.clientID, key, value)
    }

    updateDatabase = (date, clientID, key, value) => {
        const updateData = {
            date: date,
            clientID: clientID, 
            key: key, 
            value: value
        }
        fetch(process.env.REACT_APP_SERVER_URL + 'meals/update-field', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updateData)
        })
    }

    updateWeek = (week) => {
        this.setState({weekArr: week})
        this.fetchRoutes()
    }

    handleOpenModal = async (client) => {
        let data = {
            _id: client.clientID
        }
        let response = await fetch(process.env.REACT_APP_SERVER_URL + 'clients/id', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        let clientData = await response.json()
        client.phoneNumber = clientData.phoneNumber
        client.emergencyContact = clientData.emergencyContact
        client.emergencyPhone = clientData.emergencyPhone
        client.specialInstructions = clientData.specialInstructions
        client.clientC2 = clientData.clientC2
        client.clientID = clientData._id
        client.NE = clientData.NE
        client.email = clientData.email
        this.setState({currentClient: client, showModal: true})
    }

    
    handleCloseModal = () => {
        this.setState({showModal: false});
    }
    
    submit = async (newClient) => {
        let updateWeekly = {
            date: this.state.weekArr[1],
            id: newClient._id,
            foodDays: newClient.foodDays,
            frozenNumber: newClient.frozenNumber,
            frozenDay: newClient.frozenDay,
            noMilk: newClient.noMilk,
            holidayFrozen: newClient.holidayFrozen,
        }
        let updateConstant = {
            id: newClient.clientID,
            firstName: newClient.firstName,
            lastName: newClient.lastName,
            address: newClient.address,
            phoneNumber: newClient.phoneNumber,
            emergencyContact: newClient.emergencyContact,
            emergencyPhone: newClient.emergencyPhone,
            specialInstructions: newClient.specialInstructions,
            NE: newClient.NE,
            email: newClient.email,
            clientC2: newClient.clientC2,
        }

        /*Update Constant Fields in Client Database*/
        await fetch(process.env.REACT_APP_SERVER_URL + 'clients/update-data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updateConstant)
        })

        /*Update Weekly Fields in Meals Database*/
        await fetch(process.env.REACT_APP_SERVER_URL + 'meals/update-data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updateWeekly)
        })

        window.location.reload()
        // this.setState({showModal: false});
    }

    formatDate = (date) => {
        var month = (1 + date.getMonth()).toString();
        var day = date.getDate().toString();
        return month + '/' + day;
    }

    render() {
        console.log(this.state)
        let {routes, clients, weekArr} = this.state;
        let title = weekArr ? "Routes for " + this.formatDate(weekArr[1]) + " to " + this.formatDate(weekArr[5]) : "Routes Page"
        console.log(routes);
        console.log(clients);
        return (
            <div style={{marginBottom: 40}}>
                <RoutesNavbar routes={routes} fixed={true} updateWeek={this.updateWeek} updateHoliday={this.updateHoliday}/>
                <h1 className="site-manager-page-header">{title}</h1>
                {routes.length == 0 ? <h2 style={{marginTop: 40}}>No route data for this week</h2> : null}
                <div className="site-manager-container">
                    <div>
                        {routes.map((route, i) =>{
                            return (
                                <section style={{marginRight: 80, paddingLeft: 320}}>
                                    <a id={String(route)}></a>
                                    <RouteTable routenum={route} data={clients[route]} setData={this.setData} showModal={this.handleOpenModal} mondayDate={this.state.weekArr[1]}
                                        handleChange={this.handleChange} handleBoolChange={this.handleBoolChange} handleSelect={this.handleSelect}></RouteTable>
                                </section>
                        );})}
                    </div>
                    { (localStorage.getItem("userType") == "site-manager") ? 
                    <Modal isOpen={this.state.showModal} onRequestClose={this.handleCloseModal} className="Modal" overlayClassName="Overlay">
                        <ModalContent 
                            currentClient={this.state.currentClient} 
                            submit={this.submit} 
                            handleCloseModal={this.handleCloseModal}/>
                    </Modal>
                    : ""}
                </div>
            </div>
           
        );
    }
}


export default RouteHomepage;
