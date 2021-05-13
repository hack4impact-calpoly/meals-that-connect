import React, {Component} from 'react';
import Modal from 'react-modal';
import styled from 'styled-components'

class ClientModal extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            showModal: true,
            currentClient: this.props.currentClient };
    }

    handleCloseModal = () => {
        this.setState({showModal: false});
    }

    render() {
        console.log(this.state.showModal)
        return (
            <Modal isOpen={this.state.showModal} contentLabel="Minimal Modal Example" onRequestClose={this.props.closeModal} className="Modal" overlayClassName="Overlay">
                <div id="modal-content">
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
                            <input type="text" value={this.state.currentClient["firstName"]} id="client-firstname"/>
                            <input type="text" value={this.state.currentClient["lastName"]} id="client-lastname" className="secondColumn-input"/><br/>
                        </div>
                        <label for="client-address">Address</label><br/>
                        <input type="text" value={this.state.currentClient["address"]} id="client-address"/><br/>
                        <p>Food Days</p>
                        <div id="client-fooddays">
                            <label for="client-foodday-m">Monday</label><br/>
                            <input type="checkbox" checked={this.state.currentClient["foodDays"]["M"]} id="client-foodday-m"/><br/>

                            <label for="client-foodday-t">Tuesday</label><br/>
                            <input type="checkbox" checked={this.state.currentClient["foodDays"]["T"]} id="client-foodday-t"/><br/>

                            <label for="client-foodday-w">Wednesday</label><br/>
                            <input type="checkbox" checked={this.state.currentClient["foodDays"]["W"]} id="client-foodday-w"/><br/>

                            <label for="client-foodday-th">Thursday</label><br/>
                            <input type="checkbox" checked={this.state.currentClient["foodDays"]["Th"]} id="client-foodday-th"/><br/>

                            <label for="client-foodday-f">Friday</label><br/>
                            <input type="checkbox" checked={this.state.currentClient["foodDays"]["F"]} id="client-foodday-f"/><br/>

                        </div>
                        <br/>
                        <label for="client-frozenNumber">Number of Frozen Meals</label><br/>
                        <input type="text" value={this.state.currentClient["frozenNumber"]} id="client-frozenNumber"/><br/>

                        <p>Frozen Days</p>
                        <div id="client-frozendays">
                            <label for="client-frozenday-m">Monday</label><br/>
                            <input type="checkbox" checked={this.state.currentClient["frozenDay"]["M"]} id="client-frozenday-m"/><br/>

                            <label for="client-frozenday-t">Tuesday</label><br/>
                            <input type="checkbox" checked={this.state.currentClient["frozenDay"]["T"]} id="client-frozenday-t"/><br/>

                            <label for="client-frozenday-w">Wednesday</label><br/>
                            <input type="checkbox" checked={this.state.currentClient["frozenDay"]["W"]} id="client-frozenday-w"/><br/>

                            <label for="client-frozenday-th">Thursday</label><br/>
                            <input type="checkbox" checked={this.state.currentClient["frozenDay"]["Th"]} id="client-frozenday-th"/><br/>

                            <label for="client-frozenday-f">Friday</label><br/>
                            <input type="checkbox" checked={this.state.currentClient["frozenDay"]["F"]} id="client-frozenday-f"/><br/>
                        </div>

                        <label for="client-phone">Phone Number</label><br/>
                        <input type="text" value={this.state.currentClient["phoneNumber"]} id="client-phone"/><br/>

                        <label for="client-emergencycontact">Emergency Contact</label><br/>
                        <input type="text" value={this.state.currentClient["emergencyContact"]} id="client-emergencycontact"/><br/>

                        <label for="client-emergencyphone">Emergency Contact Phone</label><br/>
                        <input type="text" value={this.state.currentClient["emergencyPhone"]} id="client-emergencyphone"/><br/>

                        <label for="client-nomilk">No Milk</label><br/>
                        <input type="checkbox" checked={this.state.currentClient["noMilk"]} id="client-nomilk"/><br/>

                        <label for="client-specialinstructions">Special Instructions</label><br/>
                        <input type="text" value={this.state.currentClient["specialInstructions"]} id="client-specialinstructions"/><br/>

                        <label for="client-c2">C2 Client</label><br/>
                        <input type="checkbox" checked={this.state.currentClient["clientC2"]} id="client-c2"/><br/>

                        <label for="client-ne">N/E</label><br/>
                        <input type="text" value={this.state.currentClient["NE"]} id="client-ne"/><br/>

                        <label for="client-email">Email Address</label><br/>
                        <input type="text" value={this.state.currentClient["email"]} id="client-email"/><br/>

                        <label for="client-holidayfrozen">Holiday Frozen</label><br/>
                        <input type="checkbox" checked={this.state.currentClient["holidayFrozen"]} id="client-holidayfrozen"/><br/>
                    </div>
                </div>
            </Modal>
        );
    }
}

export default ClientModal;