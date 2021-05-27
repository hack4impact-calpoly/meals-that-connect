import React, { Component } from 'react';
import Clients from './Clients'
import "bootstrap/dist/css/bootstrap.min.css";
import Spinner from "react-bootstrap/Spinner"
import {Link} from "react-router-dom";
import Modal from 'react-modal';
import ClientModal from './ClientModal';

class ClientTableContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            clients: [],
            loaded: false,
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
                wellskyID: null,
                _id: null
            }
        }
    }

    async componentDidMount(){
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

       this.setState({clients: data, loaded: true})
    }

    componentWillMount() {
        Modal.setAppElement('body');
    }

    setData = (data) => {
        this.setState({clients: data})
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
        this.setState({currentClient: client, showModal: true})
    }
    refreshData = (client) =>
    {
        this.setState({clients: this.state.clients})
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
        window.location.reload()
    }

    render() {
        let currentUser = localStorage.getItem("userType")
        const loaded = this.state.loaded
        console.log(this.state)
        return (
            <div className="site-manager-page">
                <h1 className="site-manager-page-header">Clients</h1>
                {currentUser === "site-manager" &&
                    <Link to="/add-client">
                        <button className="generic-button">Add Client</button>
                    </Link>
                }
                <div className="site-manager-container">
                    {loaded ? <Clients data={this.state.clients} setData={this.setData} showModal={this.handleOpenModal} refreshData={this.refreshData}/> :
                        <div id = "spin">
                            <Spinner animation="border" role="status" style={{width:'70px', height:'70px', left: '50%', right: '40%', top: '40%', display: 'block', position:'absolute'}}/>
                        </div>}
                </div>
                <Modal isOpen={this.state.showModal} onRequestClose={this.handleCloseModal} className="Modal-client" overlayClassName="Overlay">
                    <ClientModal
                        currentClient={this.state.currentClient}
                        submit={this.submit}
                        handleCloseModal={this.handleCloseModal}/>
                </Modal>
            </div>
        );
    }
}

export default ClientTableContainer;

