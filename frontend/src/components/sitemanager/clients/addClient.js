import React, { Component } from 'react';
import env from "react-dotenv";

class AddClient extends Component {
    constructor(props) {
        super(props);
        this.state = {
                    firstName: "",
                    lastName: "",
                    address: "",
                    foodDays: {
                        M: false,
                        T: false,
                        W: false,
                        Th: false,
                        F: false
                    },
                    frozenNumber: "",
                    frozenDay: "",
                    phoneNumber: "",
                    emergencyContact: "",
                    emergencyPhone: "",
                    noMilk: false,
                    mealNumber: "",
                    specialInstructions: "",
                    clientC2: false,
                    NE: "",
                    email: "",
                    holidayFrozen: false,
                    routeNumber: "",
                    site: ""
        }   
    }

    async addClient(event){
        await fetch(env.backendURL + 'clients/addClient', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state)
        })
    }

    render() {
        return (
            <form style={{"padding": "100px"}} onSubmit={() => this.addClient()}>
                <h1>Add Client</h1>
                <h3>* = Required</h3>
                <div id="client-info-body">
                    <div>
                        <label for="client-firstname">First Name*</label>
                        <label for="client-lastname" className="secondColumn-text">Last Name*</label>
                    </div>
                    <div>
                        <input type="text" id="client-firstname" onChange={e => this.setState({firstName: e.target.value})} required={true}/>
                        <input type="text" id="client-lastname" className="secondColumn-input" onChange={e => this.setState({lastName: e.target.value})} required={true}/><br/>
                    </div>
                    <label for="client-address">Address*</label><br/>
                    <input type="text" id="client-address" onChange={e => this.setState({address: e.target.value})} required={true}/><br/>
                    <label for="client-mealnumber">Num. of Meals*</label><br/>
                    <input type="number" id="client-mealnumber" onChange={e => this.setState({mealNumber: e.target.value})} required={true}/><br/>
                    <p>Food Days*</p>
                    <div id="client-fooddays">
                        <label for="client-foodday-m">Monday</label><br/>
                        <input type="checkbox" id="client-foodday-m" onChange={e => this.setState(prevState => ({foodDays: {...prevState.foodDays, M: !prevState.foodDays.M}}))}/><br/>

                        <label for="client-foodday-t">Tuesday</label><br/>
                        <input type="checkbox" id="client-foodday-t" onChange={e => this.setState(prevState => ({foodDays: {...prevState.foodDays, T: !prevState.foodDays.T}}))}/><br/>

                        <label for="client-foodday-w">Wednesday</label><br/>
                        <input type="checkbox" id="client-foodday-w" onChange={e => this.setState(prevState => ({foodDays: {...prevState.foodDays, W: !prevState.foodDays.W}}))}/><br/>

                        <label for="client-foodday-th">Thursday</label><br/>
                        <input type="checkbox" id="client-foodday-th" onChange={e => this.setState(prevState => ({foodDays: {...prevState.foodDays, Th: !prevState.foodDays.Th}}))}/><br/>

                        <label for="client-foodday-f">Friday</label><br/>
                        <input type="checkbox" id="client-foodday-f" onChange={e => this.setState(prevState => ({foodDays: {...prevState.foodDays, F: !prevState.foodDays.F}}))}/><br/>

                    </div>
                    <br/>
                    <label for="client-frozenNumber">Number of Frozen Meals*</label><br/>
                    <input type="number" id="client-frozenNumber" onChange={e => this.setState({frozenNumber: e.target.value})} required={true}/><br/>

                    <p>Frozen Days</p>
                    <div id="client-frozendays">
                        <label for="client-frozenday-m">Monday</label><br/>
                        <input type="radio" id="client-frozenday-m" checked={this.state.frozenDay === "M"} onClick={() => this.setState({frozenDay: "M"})}/><br/>

                        <label for="client-frozenday-t">Tuesday</label><br/>
                        <input type="radio" id="client-frozenday-t" checked={this.state.frozenDay === "T"} onClick={() => this.setState({frozenDay: "T"})}/><br/>

                        <label for="client-frozenday-w">Wednesday</label><br/>
                        <input type="radio" id="client-frozenday-w" checked={this.state.frozenDay === "W"} onClick={() => this.setState({frozenDay: "W"})}/><br/>

                        <label for="client-frozenday-th">Thursday</label><br/>
                        <input type="radio" id="client-frozenday-th" checked={this.state.frozenDay === "Th"} onClick={() => this.setState({frozenDay: "Th"})}/><br/>

                        <label for="client-frozenday-f">Friday</label><br/>
                        <input type="radio" id="client-frozenday-f" checked={this.state.frozenDay === "F"} onClick={() => this.setState({frozenDay: "F"})}/><br/>
                    </div>

                    <label for="client-phone">Phone Number*</label><br/>
                    <input type="text" id="client-phone" onChange={e => this.setState({phoneNumber: e.target.value})} required={true}/><br/>

                    <label for="client-emergencycontact">Emergency Contact</label><br/>
                    <input type="text" id="client-emergencycontact" onChange={e => this.setState({emergencyContact: e.target.value})}/><br/>

                    <label for="client-emergencyphone">Emergency Contact Phone</label><br/>
                    <input type="text" id="client-emergencyphone" onChange={e => this.setState({emergencyPhone: e.target.value})}/><br/>

                    <label for="client-nomilk">No Milk</label><br/>
                    <input type="checkbox" id="client-nomilk" onChange={() => this.setState(prevState => ({noMilk: !prevState.noMilk}))}/><br/>

                    <label for="client-specialinstructions">Special Instructions</label><br/>
                    <input type="text" id="client-specialinstructions" onChange={e => this.setState({specialInstructions: e.target.value})}/><br/>

                    <label for="client-c2">C2 Client</label><br/>
                    <input type="checkbox" id="client-c2" onChange={() => this.setState(prevState => ({clientC2: !prevState.clientC2}))}/><br/>

                    <label for="client-ne">N/E</label><br/>
                    <input type="text" id="client-ne" onChange={e => this.setState({NE: e.target.value})}/><br/>

                    <label for="client-email">Email Address</label><br/>
                    <input type="email" id="client-email" onChange={e => this.setState({email: e.target.value})}/><br/>

                    <label for="client-holidayfrozen">Holiday Frozen</label><br/>
                    <input type="checkbox" id="client-holidayfrozen" onChange={() => this.setState(prevState => ({holidayFrozen: !prevState.holidayFrozen}))}/><br/>

                    <label for="client-routenumber">Route Number*</label><br/>
                    <input type="text" id="client-routenumber" onChange={e => this.setState({routeNumber: e.target.value})} required={true}/><br/>

                    <label for="client-site">Site*</label><br/>
                    <input type="text" id="client-site" onChange={e => this.setState({site: e.target.value})} required={true}/><br/>
                    <br/>
                    <input type="submit"/>
                </div>
            </form>
        );
    }
}

export default AddClient;