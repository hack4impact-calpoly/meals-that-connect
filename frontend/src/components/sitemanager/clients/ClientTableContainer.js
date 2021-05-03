import React, { Component } from 'react';
import Clients from './Clients'
import 'bootstrap/dist/css/bootstrap.min.css';
import Spinner from "react-bootstrap/Spinner"
import {Link} from "react-router-dom";
import Modal from 'react-modal';


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

    handleOpenModal = (currentClient) => {
        this.setState({showModal: true, currentClient: currentClient});
    }
    
    handleCloseModal = () => {
        this.setState({showModal: false});
    }

    render() {
        console.log(this.state.clients)
        let currentClient = this.state.currentClient;
      
        return (
            <div className="site-manager-page">
                <h1 className="site-manager-page-header">Clients</h1>
                <Link to="/add-client">
                    <button>Add Client</button>
                </Link>
                <div className="site-manager-container">
                    {this.state.loaded === true ? <Clients data={this.state.clients} setData={this.setData} showModal={this.handleOpenModal}/> :
                    <div>
                        <Spinner animation="border" role="status" />
                    </div>}
                </div>
                <Modal isOpen={this.state.showModal} onRequestClose={this.handleCloseModal} className="Modal-client" overlayClassName="Overlay">
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
            </div>
        );
    }
}

export default ClientTableContainer;

