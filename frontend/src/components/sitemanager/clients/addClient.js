import React, { Component } from 'react';


class AddClient extends Component {
    constructor(props) {
        super(props);
        this.state = {
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
                    index: null
            }
        }   
    }

    updateClient = () => {
        this.setState({
            currentClient: {
                ...this.state.currentClient,
                
            }
        })
    }

    addClient = (event) => {
        await fetch(env.backendURL + 'clients/addClient', {
            method: 'POST',
            headers: {

            }
            body: JSON.stringify()
        })
    }

    render() {
        return (
            <div style={{"padding": "100px"}}>
                <h1>Add Client</h1>
                <div id="client-info-body">
                    <div>
                        <label for="client-firstname">First Name</label>
                        <label for="client-lastname" className="secondColumn-text">Last Name</label>
                    </div>
                    <div>
                        <input type="text" id="client-firstname"/>
                        <input type="text" id="client-lastname" className="secondColumn-input"/><br/>
                    </div>
                    <label for="client-address">Address</label><br/>
                    <input type="text" id="client-address"/><br/>
                    <label for="client-mealnumber">Num. of Meals</label><br/>
                    <input type="text" id="client-mealnumber"/><br/>
                    <p>Food Days</p>
                    <div id="client-fooddays">
                        <label for="client-foodday-m">Monday</label><br/>
                        <input type="checkbox" id="client-foodday-m"/><br/>

                        <label for="client-foodday-t">Tuesday</label><br/>
                        <input type="checkbox" id="client-foodday-t"/><br/>

                        <label for="client-foodday-w">Wednesday</label><br/>
                        <input type="checkbox" id="client-foodday-w"/><br/>

                        <label for="client-foodday-th">Thursday</label><br/>
                        <input type="checkbox" id="client-foodday-th"/><br/>

                        <label for="client-foodday-f">Friday</label><br/>
                        <input type="checkbox" id="client-foodday-f"/><br/>

                    </div>
                    <br/>
                    <label for="client-frozenNumber">Number of Frozen Meals</label><br/>
                    <input type="text" id="client-frozenNumber"/><br/>

                    <p>Frozen Days</p>
                    <div id="client-frozendays">
                        <label for="client-frozenday-m">Monday</label><br/>
                        <input type="checkbox" id="client-frozenday-m"/><br/>

                        <label for="client-frozenday-t">Tuesday</label><br/>
                        <input type="checkbox" id="client-frozenday-t"/><br/>

                        <label for="client-frozenday-w">Wednesday</label><br/>
                        <input type="checkbox" id="client-frozenday-w"/><br/>

                        <label for="client-frozenday-th">Thursday</label><br/>
                        <input type="checkbox" id="client-frozenday-th"/><br/>

                        <label for="client-frozenday-f">Friday</label><br/>
                        <input type="checkbox" id="client-frozenday-f"/><br/>
                    </div>

                    <label for="client-phone">Phone Number</label><br/>
                    <input type="text" id="client-phone"/><br/>

                    <label for="client-emergencycontact">Emergency Contact</label><br/>
                    <input type="text" id="client-emergencycontact"/><br/>

                    <label for="client-emergencyphone">Emergency Contact Phone</label><br/>
                    <input type="text" id="client-emergencyphone"/><br/>

                    <label for="client-nomilk">No Milk</label><br/>
                    <input type="checkbox" id="client-nomilk"/><br/>

                    <label for="client-specialinstructions">Special Instructions</label><br/>
                    <input type="text" id="client-specialinstructions"/><br/>

                    <label for="client-c2">C2 Client</label><br/>
                    <input type="checkbox" id="client-c2"/><br/>

                    <label for="client-ne">N/E</label><br/>
                    <input type="text" id="client-ne"/><br/>

                    <label for="client-email">Email Address</label><br/>
                    <input type="text" id="client-email"/><br/>

                    <label for="client-holidayfrozen">Holiday Frozen</label><br/>
                    <input type="checkbox" id="client-holidayfrozen"/><br/>
                </div>
            </div>
        );
    }
}

export default AddClient;