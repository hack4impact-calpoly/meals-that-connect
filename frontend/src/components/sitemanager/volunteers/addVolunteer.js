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
                    site: "",
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
        return (
            <form style={{"padding": "100px"}} onSubmit={() => this.addVolunteer()}>
                <h1>Add Volunteer</h1>
                <div id="volunteer-info-body">
                    <div>
                        <label for="volunter-firstname">First Name</label>
                        <label for="volunteer-lastname" className="secondColumn-text">Last Name</label>
                    </div>
                    <div>
                        <input type="text" id="volunteer-firstname" onChange={e => this.setState({firstName: e.target.value})} required={true}/>
                        <input type="text" id="volunteer-lastname" className="secondColumn-input" onChange={e => this.setState({lastName: e.target.value})} required={true}/><br/>
                    </div>
                    
                    <label for="volunteer-email">Email Address</label><br/>
                    <input type="email" id="volunteer-email" onChange={e => this.setState({email: e.target.value})}/><br/>
                    
                    <label for="volunteer-password">Temporary Password</label><br/>
                    <input type="text" id="volunteer-password" onChange={e => this.setState({password: e.target.value})} required={true}/><br/>
                    
                    <label for="volunteer-kitchenStaff">Kitchen Staff</label><br/>
                    <input type="checkbox" id="volunteer-kitchenStaff" onChange={() => this.setState(prevState => ({kitchenStaff: !prevState.kitchenStaff}))}/><br/>

                    <label for="volunteer-isAuthenticated_driver">Authenticated Driver</label><br/>
                    <input type="checkbox" id="volunteer-isAuthenticated_driver" onChange={() => this.setState(prevState => ({isAuthenticated_driver: !prevState.isAuthenticated_driver}))}/><br/>

                    <label for="volunteer-isAuthenticated_kitchenStaff">Authenticated Kitchen Staff</label><br/>
                    <input type="checkbox" id="volunteer-isAuthenticated_kitchenStaff" onChange={() => this.setState(prevState => ({isAuthenticated_kitchenStaff: !prevState.isAuthenticated_kitchenStaff}))}/><br/>

                    <label for="volunteer-site">Site</label><br/>
                    <input type="text" id="volunteer-site" onChange={e => this.setState({site: e.target.value})} required={true}/><br/>
                    
                    <label for="volunteer-phone">Phone Number</label><br/>
                    <input type="text" id="volunteer-phone" onChange={e => this.setState({phoneNumber: e.target.value})} required={true}/><br/>
                    
                    <label>Avaliability</label>
                    <div id="volunteer-avaliability">
                        <label for="volunteer-m">Monday</label><br/>
                        <input type="checkbox" id="volunteer-m" onChange={e => this.setState(prevState => ({availability: {...prevState.availability, M: !prevState.availability.M}}))}/><br/>

                        <label for="volunteer-t">Tuesday</label><br/>
                        <input type="checkbox" id="volunteer-t" onChange={e => this.setState(prevState => ({availability: {...prevState.availability, T: !prevState.availability.T}}))}/><br/>

                        <label for="volunteer-w">Wednesday</label><br/>
                        <input type="checkbox" id="volunteer-w" onChange={e => this.setState(prevState => ({availability: {...prevState.availability, W: !prevState.availability.W}}))}/><br/>

                        <label for="volunteer-th">Thursday</label><br/>
                        <input type="checkbox" id="volunteer-th" onChange={e => this.setState(prevState => ({availability: {...prevState.availability, Th: !prevState.availability.Th}}))}/><br/>

                        <label for="volunteer-f">Friday</label><br/>
                        <input type="checkbox" id="volunteer-f" onChange={e => this.setState(prevState => ({availability: {...prevState.availability, F: !prevState.availability.F}}))}/><br/>

                    </div>
                    <br/>
                    <label for="volunteer-notes">Notes</label><br/>
                    <input type="text" id="volunteer-notes" onChange={e => this.setState({notes: e.target.value})}/><br/>

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