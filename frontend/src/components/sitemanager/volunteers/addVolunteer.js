import React, { Component } from 'react';
import env from "react-dotenv";

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
                    site: "SLO",
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

    async addVolunteer(event){
        console.log(this.state)
        await fetch(env.backendURL + 'volunteers/addVolunteer', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state)
        })
    }

    render() {
        console.log(this.state.site)
        return (
            <form style={{"padding": "100px"}} onSubmit={() => this.addVolunteer()}>
                <h1>Add Volunteer</h1>
                <div id="volunteer-info-body">
                    <div style={{"grid-template-columns": "auto auto", "justify-content": "space-evenly", "row-gap": "10px", "column-gap": "0px"}} className="two-column">
                        <div><label for="volunter-firstname">First Name</label></div>
                        <div><label for="volunteer-lastname" className="secondColumn-text">Last Name</label></div>
                        <div><input type="text" id="volunteer-firstname" onChange={e => this.setState({firstName: e.target.value})} required={true}/></div>
                        <div><input type="text" id="volunteer-lastname" className="secondColumn-input" onChange={e => this.setState({lastName: e.target.value})} required={true}/><br/></div>
                    </div>
                    <label for="volunteer-email">Email Address</label><br/>
                    <input type="email" id="volunteer-email" onChange={e => this.setState({email: e.target.value})} style={{"width": "1320px"}}/><br/>
                    
                    <label for="volunteer-password">Temporary Password</label><br/>
                    <input type="text" id="volunteer-password" onChange={e => this.setState({password: e.target.value})} required={true} style={{"width": "1320px"}}/><br/>
                    <table style={{marginTop: "10px", marginLeft: "auto", marginRight: "auto"}} className="add-table">
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

                    <label for="volunteer-site">Site</label><br/>
                    <select onChange={e => this.setState({site: e.target.value})} required={true} className= "drop-down-site">
                        <option value="SLO">SLO</option>
                        <option value="Five Cities">Five Cities</option>
                        <option value="Cambria">Cambria</option>
                    </select>
                    <br/>
                    
                    <label for="volunteer-phone">Phone Number</label><br/>
                    <input type="text" id="volunteer-phone" onChange={e => this.setState({phoneNumber: e.target.value})} required={true} style={{"width": "1320px"}}/><br/>
                    
                    <label>Avaliability</label>
                    <table style={{marginTop: "10px", marginLeft: "auto", marginRight: "auto"}} className="add-table">
                        <tr>
                            <th><label for="volunteer-m">Monday</label></th>
                            <th><label for="volunteer-t">Tuesday</label></th>
                            <th><label for="volunteer-w">Wednesday</label></th>
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

                    <label for="volunteer-digitalSystem">Digital System</label><br/>
                    <input type="checkbox" id="volunteer-digitalSystem" onChange={() => this.setState(prevState => ({digitalSystem: !prevState.digitalSystem}))}/><br/>

                    <label for="volunteer-completedOrientation">Completed Orientation?</label><br/>
                    <input type="checkbox" id="volunteer-completedOrientation" onChange={() => this.setState(prevState => ({completedOrientation: !prevState.completedOrientation}))}/><br/>

                    <br/>
                    <input type="submit"/>
                </div>
            </form>
        );
    }
}
export default AddVolunteer;