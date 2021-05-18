import React, { Component } from 'react';
import '../../../css/AddPersons.css';
import { withRouter } from "react-router-dom";
import "../../../css/Modal.css";

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
                    specialInstructions: "",
                    clientC2: false,
                    NE: "",
                    email: "",
                    holidayFrozen: false,
                    routeNumber: "-1",
                    site: localStorage.getItem("site"),
                    index: ""
        }   
    }

    addClient = (e) => {
        e.preventDefault()
        fetch(process.env.REACT_APP_SERVER_URL + 'clients/addClient', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state)
        }).then((res) => {
            console.log("Successfully added client")
            this.props.history.push('/clients');
        })
        
    }

    render() {
        return (
            <form style={{"padding": "100px"}} onSubmit={this.addClient}>
                <h1>Add Client</h1>
                <h3>* = Required</h3>
                <div style={{"padding-bottom": "100px", "padding-left": "10px", "margin-left": "10px", "text-align": "left"}}>
                    <div className="two-column">
                            <div> <label for="client-firstname">First Name*</label><br/> </div>
                            <div> <label for="client-lastname">Last Name*</label><br/> </div>
                            <div> <input type="text" id="client-firstname" 
                                onChange={e => this.setState({firstName: e.target.value})} 
                                required={true}/> </div>
                            <div> <input type="text" id="client-lastname" 
                                onChange={e => this.setState({lastName: e.target.value})} 
                                required={true}/></div>
                    </div>
                    <label for="client-address">Address*</label><br/>
                    <input type="text" id="client-address" onChange={e => this.setState({address: e.target.value})} required={true} style={{"width": "1130px"}}/><br/>
                    
                    <br></br>

                    <div style={{"text-align": "left"}}>
                        <label>Food Days*</label>
                    </div>
                    <table style={{marginLeft: "left", marginRight: "auto"}} className="add-table">
                        <tr>
                            <th><label for="client-foodday-m">Monday</label></th>
                            <th><label for="client-foodday-t">Tuesday</label></th>
                            <th style={{width: "25%"}}><label for="client-foodday-w">Wednesday</label></th>
                            <th><label for="client-foodday-th">Thursday</label></th>
                            <th><label for="client-foodday-f">Friday</label></th>
                        </tr>
                        <tr>
                            <td><input type="checkbox" id="client-foodday-m" onChange={e => this.setState(prevState => ({foodDays: {...prevState.foodDays, M: !prevState.foodDays.M}}))}/></td>
                            <td><input type="checkbox" id="client-foodday-t" onChange={e => this.setState(prevState => ({foodDays: {...prevState.foodDays, T: !prevState.foodDays.T}}))}/></td>
                            <td><input type="checkbox" id="client-foodday-w" onChange={e => this.setState(prevState => ({foodDays: {...prevState.foodDays, W: !prevState.foodDays.W}}))}/></td>
                            <td><input type="checkbox" id="client-foodday-th" onChange={e => this.setState(prevState => ({foodDays: {...prevState.foodDays, Th: !prevState.foodDays.Th}}))}/></td>
                            <td><input type="checkbox" id="client-foodday-f" onChange={e => this.setState(prevState => ({foodDays: {...prevState.foodDays, F: !prevState.foodDays.F}}))}/></td>
                        </tr>               
                    </table>
                    <br/>
                    <div style={{"text-align": "left"}}> <label for="client-frozenNumber">Number of Frozen Meals*</label><br/> </div>
                    <input type="number" style={{"margin-left": "0px"}} id="client-frozenNumber" onChange={e => this.setState({frozenNumber: e.target.value})} required={true}/><br/>
                    
                    <br></br>

                    <div> <label>Frozen Days</label> </div>
                    <table style={{marginLeft: "left", marginRight: "auto"}} className="add-table">
                        <tr>
                            <th><label for="client-frozenday-m">Monday</label></th>
                            <th><label for="client-frozenday-t">Tuesday</label></th>
                            <th style={{width: "25%"}}><label for="client-frozenday-w">Wednesday</label></th>
                            <th><label for="client-frozenday-th">Thursday</label></th>
                            <th><label for="client-frozenday-f">Friday</label></th>
                        </tr>
                        <tr>
                            <td><input type="radio" id="client-frozenday-m" checked={this.state.frozenDay === "M"} onClick={() => this.setState({frozenDay: "M"})}/></td>
                            <td><input type="radio" id="client-frozenday-t" checked={this.state.frozenDay === "T"} onClick={() => this.setState({frozenDay: "T"})}/></td>
                            <td><input type="radio" id="client-frozenday-w" checked={this.state.frozenDay === "W"} onClick={() => this.setState({frozenDay: "W"})}/></td>
                            <td><input type="radio" id="client-frozenday-th" checked={this.state.frozenDay === "Th"} onClick={() => this.setState({frozenDay: "Th"})}/></td>
                            <td><input type="radio" id="client-frozenday-f" checked={this.state.frozenDay === "F"} onClick={() => this.setState({frozenDay: "F"})}/></td>
                        </tr>
                    </table>

                    <br></br>

                    <div style={{"text-align": "left"}}> <label for="client-phone">Phone Number*</label><br/> </div>
                    <input type="text" id="client-phone" onChange={e => this.setState({phoneNumber: e.target.value})} required={true} style={{"width": "1130px"}}/><br/>

                    <br></br>

                    <div className="two-column">
                        <div><label for="client-emergencycontact">Emergency Contact</label></div>
                        <div><label for="client-emergencyphone">Emergency Contact Phone</label></div>
                        <div><input type="text" id="client-emergencycontact" onChange={e => this.setState({emergencyContact: e.target.value})}/></div>
                        <div><input type="text" id="client-emergencyphone" onChange={e => this.setState({emergencyPhone: e.target.value})}/></div>
                    </div>

                    <br></br>

                    <label for="client-nomilk">No Milk</label><br/>
                    <input type="checkbox" id="client-nomilk" onChange={() => this.setState(prevState => ({noMilk: !prevState.noMilk}))}/><br/>

                    <label for="client-specialinstructions">Special Instructions</label><br/>
                    <input type="text" id="client-specialinstructions" onChange={e => this.setState({specialInstructions: e.target.value})} style={{"width": "1130px"}}/><br/>


                    <label for="client-c2">C2 Client</label><br/>
                    <input type="checkbox" id="client-c2" onChange={() => this.setState(prevState => ({clientC2: !prevState.clientC2}))}/><br/>

                    <br></br>

                    <label for="client-ne">N/E</label><br/>
                    <input type="text" id="client-ne" onChange={e => this.setState({NE: e.target.value})} style={{"width": "1130px"}}/><br/>

                    <label for="client-email">Email Address*</label><br/>
                    <input type="email" id="client-email" onChange={e => this.setState({email: e.target.value})} required={true} style={{"width": "1130px"}}/><br/>

                    <label for="client-holidayfrozen">Holiday Frozen</label><br/>
                    <input type="checkbox" id="client-holidayfrozen" onChange={() => this.setState(prevState => ({holidayFrozen: !prevState.holidayFrozen}))}/><br/>

                    <label for="client-routenumber">Route Number</label><br/>
                    <input type="text" id="client-routenumber" onChange={e => this.setState({routeNumber: e.target.value})} /><br/>

                    <br/>

                    <button type="submit">Submit</button>
                </div>
            </form>
        );
    }
}

export default withRouter(AddClient);