import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import '../../../css/manager.css';
import "../../../css/Modal.css";

class AddVolunteer extends Component {
    constructor(props) {
        super(props);
        this.state = {
                    firstName: "",
                    lastName: "",
                    address: "",
                    email: "",
                    password: "",
                    kitchenStaff: false,
                    isAuthenticated_driver: false,
                    isAuthenticated_kitchenStaff: false,
                    site: localStorage.getItem("site"),
                    phoneNumber: "",
                    availability: {
                        M: false,
                        T: false,
                        W: false,
                        Th: false,
                        F: false,
                    },
                    notes: "",
                    digitalSystem: false,
                    completedOrientation: false
        }   
    }

   addVolunteer = (e) => {
        e.preventDefault()
        fetch(process.env.REACT_APP_SERVER_URL + 'volunteers/addVolunteer', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state)
        }).then(() => {
            console.log("Successfully added volunteer")
            this.props.history.push('/volunteer');
        })
    }

    render() {
        return (
            <form style={{"padding": "100px"}} onSubmit={this.addVolunteer}>
                <h1>Add Volunteer</h1>
                <h3>* = Required</h3>
                <div id="volunteer-info-body" style={{"padding-bottom": "100px", "padding-left": "10px", "margin-left": "10px", "text-align": "left"}}>

                    <div className="two-column">
                        <div><label for="volunter-firstname">First Name*</label></div>
                        <div><label for="volunteer-lastname" className="secondColumn-text">Last Name*</label></div>
                        <div><input type="text" id="volunteer-firstname" onChange={e => this.setState({firstName: e.target.value})} required={true}/></div>
                        <div><input type="text" id="volunteer-lastname" className="secondColumn-input" onChange={e => this.setState({lastName: e.target.value})} required={true}/><br/></div>
                    </div>

                    <div className="two-column">
                        <div><label for="volunteer-email">Email Address*</label></div>
                        <div><label for="volunteer-phone">Phone Number*</label></div>
                        <div><input type="email" id="volunteer-email" onChange={e => this.setState({email: e.target.value})} required={true}/></div>
                        <div><input type="text" id="volunteer-phone" onChange={e => this.setState({phoneNumber: e.target.value})} required={true}/><br/></div>
                    </div>
                    <br/>
                    
                    <table style={{marginTop: "10px", marginLeft: "left", marginRight: "auto"}} className="add-table">
                        <tr>
                            <th><label for="volunteer-kitchenStaff">Kitchen Staff</label></th>
                            <th><label for="volunteer-isAuthenticated_driver">Authenticated Driver</label></th>
                            <th><label for="volunteer-isAuthenticated_kitchenStaff">Authenticated Kitchen Staff</label></th>
                        </tr>
                        <tr>
                            <td><input type="checkbox" id="volunteer-kitchenStaff" onChange={() => this.setState(prevState => ({kitchenStaff: !prevState.kitchenStaff}))}/></td>
                            <td><input type="checkbox" id="volunteer-isAuthenticated_driver" onChange={() => this.setState(prevState => ({isAuthenticated_driver: !prevState.isAuthenticated_driver}))}/></td>
                            <td><input type="checkbox" id="volunteer-isAuthenticated_kitchenStaff" onChange={() => this.setState(prevState => ({isAuthenticated_kitchenStaff: !prevState.isAuthenticated_kitchenStaff}))}/></td>
                        </tr>
                    </table>
                    
                    <br></br>
                    
                    <label>Availability</label>
                    <table style={{marginTop: "10px", marginLeft: "left", marginRight: "auto"}} className="add-table">
                        <tr>
                            <th><label for="volunteer-m">Monday</label></th>
                            <th><label for="volunteer-t">Tuesday</label></th>
                            <th style={{width: "25%"}}><label for="volunteer-w">Wednesday</label></th>
                            <th><label for="volunteer-th">Thursday</label></th>
                            <th><label for="volunteer-f">Friday</label></th>
                        </tr>
                        <tr>
                            <td><input type="checkbox" id="volunteer-m" onChange={e => this.setState(prevState => ({availability: {...prevState.availability, M: !prevState.availability.M}}))}/></td>
                            <td><input type="checkbox" id="volunteer-t" onChange={e => this.setState(prevState => ({availability: {...prevState.availability, T: !prevState.availability.T}}))}/></td>
                            <td><input type="checkbox" id="volunteer-w" onChange={e => this.setState(prevState => ({availability: {...prevState.availability, W: !prevState.availability.W}}))}/></td>
                            <td><input type="checkbox" id="volunteer-th" onChange={e => this.setState(prevState => ({availability: {...prevState.availability, Th: !prevState.availability.Th}}))}/></td>
                            <td><input type="checkbox" id="volunteer-f" onChange={e => this.setState(prevState => ({availability: {...prevState.availability, F: !prevState.availability.F}}))}/></td>
                        </tr>
                    </table>
                    <br/>
                    <label for="volunteer-notes">Notes</label><br/>
                    <input type="text" id="volunteer-notes" onChange={e => this.setState({notes: e.target.value})} style={{"width": "1320px"}}/><br/>

                    <br></br>

                    <label for="volunteer-digitalSystem">Digital System</label><br/>
                    <input type="checkbox" id="volunteer-digitalSystem" onChange={() => this.setState(prevState => ({digitalSystem: !prevState.digitalSystem}))}/><br/>

                    <br></br>

                    <label for="volunteer-completedOrientation">Completed Orientation?</label><br/>
                    <input type="checkbox" id="volunteer-completedOrientation" onChange={() => this.setState(prevState => ({completedOrientation: !prevState.completedOrientation}))}/><br/>

                    <br/>
                    <div id="button-div">
                    <button type="button" className="generic-button" onClick={()=> this.props.history.push("/volunteer")}>Cancel</button>
                    <input type="submit" className="generic-button"/>
                    </div>
                </div>
            </form>
        );
    }
}
export default withRouter(AddVolunteer);