import React, { Component } from 'react';
import RouteTable from './RouteTable';
import Modal from 'react-modal';
import RoutesNavbar from './RoutesNavbar';
import ModalContent from './RouteModal';
import "../../../css/Modal.css"

class RouteHomepage extends Component {
    constructor(props) {
        super(props);
        this.state = {  
            clients: {},
            routes: [],
            showModal: false,
            firstName: "",
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
                mealNumber: null,
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

    async componentDidMount(){
        await this.fetchClients()
    }
    
    componentWillMount() {
        Modal.setAppElement('body');
    }

    updateHoliday = (holidays) => {
        this.setState({holidayArr: holidays})
    }

    async fetchClients () {
        let info = {
            site: localStorage.getItem("site"),
        }
        let response = await fetch(process.env.REACT_APP_SERVER_URL + 'clients/site', {
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

    handleOpenModal = async (id) => {
        let clientID = {
            _id: id
        }
        let response = await fetch(process.env.REACT_APP_SERVER_URL + 'clients/id', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(clientID)
        })
        let client = await response.json()
        this.setState({firstName: client.firstName, currentClient: client, showModal: true})
    }
    
    handleCloseModal = () => {
        this.setState({showModal: false});
    }
    
    submit = async (newClient, date) => {
        let updateWeekly = {
            date: date,
            client: newClient
        }
        let updateConstant = {
            id: newClient._id,
            firstName: newClient.firstName,
            lastName: newClient.lastName,
            address: newClient.address,
            foodDays: newClient.foodDays,
            frozenNumber: newClient.frozenNumber,
            frozenDay: newClient.frozenDay,
            phoneNumber: newClient.phoneNumber,
            emergencyContact: newClient.emergencyContact,
            emergencyPhone: newClient.emergencyPhone,
            noMilk: newClient.noMilk,
            mealNumber: newClient.mealNumber,
            specialInstructions: newClient.specialInstructions,
            clientC2: newClient.clientC2,
            NE: newClient.NE,
            email: newClient.email,
            holidayFrozen: newClient.holidayFrozen,
            routeNumber: newClient.routeNumber,
            site: newClient.site,
            index: newClient.index,
        }
        /*Update Constant Fields*/
        await fetch(process.env.REACT_APP_SERVER_URL + 'clients/update-client', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updateConstant)
        })
        /*Update Weekly Fields*/
        await fetch(process.env.REACT_APP_SERVER_URL + 'meals/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updateWeekly)
        })
        window.location.reload()
    }

    formatDate = (date) => {
        var month = (1 + date.getMonth()).toString();
        var day = date.getDate().toString();
        return month + '/' + day;
      }

    render() {
        let {routes, clients, weekArr} = this.state;
        let title = weekArr ? "Routes for " + this.formatDate(weekArr[1]) + " to " + this.formatDate(weekArr[5]) : "Routes Page"
        return (
            <div style={{marginBottom: 40}}>
                <RoutesNavbar routes={routes} fixed={true} updateWeek={this.updateWeek} updateHoliday={this.updateHoliday}/>
                <h1 className="site-manager-page-header">{title}</h1>
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
                        <ModalContent 
                            currentClient={this.state.currentClient} 
                            submit={this.submit} 
                            handleCloseModal={this.handleCloseModal}/>
                    </Modal>
                </div>
            </div>
           
        );
    }
}


export default RouteHomepage;
