import React, { Component } from 'react';
import Select from 'react-select'
import "../../../css/Modal.css"

class ModalContent extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            firstName: this.props.currentClient.firstName,
            lastName: this.props.currentClient.lastName,
            address: this.props.currentClient.address,
            foodDays: {
                M: this.props.currentClient.foodDays.M,
                T: this.props.currentClient.foodDays.T,
                W: this.props.currentClient.foodDays.W,
                Th: this.props.currentClient.foodDays.Th,
                F: this.props.currentClient.foodDays.F
            },
            frozenNumber: this.props.currentClient.frozenNumber,
            frozenDay: this.props.currentClient.frozenDay,
            phoneNumber: this.props.currentClient.phoneNumber,
            emergencyContact: this.props.currentClient.emergencyContact,
            emergencyPhone: this.props.currentClient.emergencyPhone,
            noMilk: this.props.currentClient.noMilk,
            specialInstructions: this.props.currentClient.specialInstructions,
            clientC2: this.props.currentClient.clientC2,
            NE: this.props.currentClient.NE,
            email: this.props.currentClient.email,
            holidayFrozen: this.props.currentClient.holidayFrozen,
            routeNumber: this.props.currentClient.routeNumber,
            site: this.props.currentClient.site,
            index: this.props.currentClient.index,
            _id: this.props.currentClient._id
         }
    }

    handleChangeMoreInfo = (name, value) => {
        if(name ==="foodDays"){
            let foodDays = this.state.foodDays
            foodDays[value] = !(this.state.foodDays[value])
            this.setState({foodDays: foodDays})
        }
        else {
            this.setState({[name]: value})
        }
    }

    render() {
        const options1 = [
            { value: 'None', label: 'None' },
            { value: 'M', label: 'M' },
            { value: 'T', label: 'T' },
            { value: 'W', label: 'W' },
            { value: 'Th', label: 'Th' },
            { value: 'F', label: 'F' }
        ]
        const options2 = [
            { value: '0', label: '0' },
            { value: '2', label: '2' },
            { value: '7', label: '7' }
        ]
        const customStyles = {
            control: (provided, state) => ({
                ...provided,
                border: '2px solid grey',
                width: '250px'
            }),
            singleValue: (provided, state) => {
                const padding = 3;
            
                return { ...provided,  padding, width: '250px' };
            },
            input: (provided, state) => ({
                ...provided,
                padding: 0,
                width: '250px'
            }),
        }
        let currentClient = this.state;
        return (
            <div style={{marginBottom: 40}}>
                <div id="modal-content">
                    <div id="client-info-header" style={{position: "fixed"}}>
                        <h1>Client Information</h1>
                        <button 
                            onClick={this.props.handleCloseModal} 
                            className="generic-button" 
                            style={{margin: '10px 0px '}}>{"Cancel"}</button>
                        <button 
                            className="generic-button"
                            onClick={() => this.props.submit(this.state)} 
                            style={{margin: '10px 0px 10px 20px'}}> Save </button>
                    </div>
                    <div id="client-info-body">
                        <div className="two-column">
                            <div><label for="client-firstname">First Name</label></div>
                            <div><label for="client-lastname">Last Name</label></div>
                            <div><input 
                                    type="text" 
                                    value={currentClient.firstName} 
                                    id="client-firstname" 
                                    onChange={e =>  this.handleChangeMoreInfo("firstName", e.target.value)}/></div>
                            <div><input 
                                    type="text" 
                                    value={currentClient.lastName} 
                                    id="client-lastname"
                                    onChange={e =>  this.handleChangeMoreInfo("lastName", e.target.value)}/></div>
                        </div>
                        <label for="client-address">Address</label><br/>

                        <input 
                            type="text" 
                            value={currentClient["address"]} 
                            id="client-address" 
                            style={{width: "1130px"}}
                            onChange={e =>  this.handleChangeMoreInfo("address", e.target.value)}/><br/>
                        <label for="client-route">Route Number</label><br/>

                        <input 
                            type="text" 
                            value={currentClient["routeNumber"]} 
                            id="client-route" 
                            style={{width: "1130px"}}
                            onChange={e =>  this.handleChangeMoreInfo("routeNumber", e.target.value)}/><br/>
                        <label>Food Days</label>
                        <table className="add-table">
                            <tbody>
                                <tr>
                                    <th>Monday</th>
                                    <th>Tuesday</th>
                                    <th>Wednesday</th>
                                    <th>Thursday</th>
                                    <th>Friday</th>
                                </tr>
                                <tr>
                                    <td><input type="checkbox" checked={currentClient["foodDays"]["M"]} id="client-foodday-m" onChange={e =>  this.handleChangeMoreInfo("foodDays", "M")}/></td>
                                    <td><input type="checkbox" checked={currentClient["foodDays"]["T"]} id="client-foodday-t" onChange={e =>  this.handleChangeMoreInfo("foodDays", "T")}/></td>
                                    <td><input type="checkbox" checked={currentClient["foodDays"]["W"]} id="client-foodday-w" onChange={e =>  this.handleChangeMoreInfo("foodDays", "W")}/></td>
                                    <td><input type="checkbox" checked={currentClient["foodDays"]["Th"]} id="client-foodday-th" onChange={e =>  this.handleChangeMoreInfo("foodDays", "Th")}/></td>
                                    <td><input type="checkbox" checked={currentClient["foodDays"]["F"]} id="client-foodday-f" onChange={e =>  this.handleChangeMoreInfo("foodDays", "F")}/></td>
                                </tr>
                            </tbody>
                        </table>
                        <br/>
                        <div style={{"text-align": "left"}}> <label for="client-frozenNumber">Number of Frozen Meals</label><br/> </div>
                        <div style={{width: 300}}>
                            <Select 
                                options={options2} 
                                styles={customStyles} 
                                placeholder="Select" 
                                defaultValue={{value: this.state.frozenNumber, label: this.state.frozenNumber}} 
                                onChange={e => this.setState({frozenNumber: e.value})}/>
                        </div>

                        <label>Frozen Days</label>
                        <Select 
                            options={options1} 
                            styles={customStyles} 
                            placeholder="Select" 
                            defaultValue={{value: currentClient.frozenDay, label: currentClient.frozenDay}} 
                            onChange={e => this.handleChangeMoreInfo("frozenDay", e.value)}/>

                        <label for="client-phone">Phone Number</label><br/>
                        <input type="text" value={currentClient["phoneNumber"]} id="client-phone" style={{width: "1130px"}} onChange={e =>  this.handleChangeMoreInfo("phoneNumber", e.target.value)}/><br/>
                        <div className="two-column">
                            <div><label for="client-emergencycontact">Emergency Contact</label></div>
                            <div><label for="client-emergencyphone" className="secondColumn-text">Emergency Contact Phone</label></div>
                            <div><input type="text" value={currentClient["emergencyContact"]} id="client-emergencycontact" onChange={e =>  this.handleChangeMoreInfo("emergencyContact", e.target.value)}/></div>
                            <div><input type="text" value={currentClient["emergencyPhone"]} id="client-emergencyphone" className="secondColumn-input" onChange={e =>  this.handleChangeMoreInfo("emergencyPhone", e.target.value)}/></div>
                        </div>

                        <label for="client-specialinstructions">Special Instructions</label><br/>
                        <input type="text" value={currentClient["specialInstructions"]} id="client-specialinstructions" onChange={e => this.handleChangeMoreInfo("specialInstructions", e.target.value)}/><br/>

                        <label for="client-ne">N/E</label><br/>
                        <input type="text" value={currentClient["NE"]} id="client-ne" onChange={e =>  this.handleChangeMoreInfo("NE", e.target.value)}/><br/>

                        <label for="client-email">Email Address</label><br/>
                        <input type="text" value={currentClient["email"]} id="client-email" onChange={e =>  this.handleChangeMoreInfo("email", e.target.value)}/><br/>

                        <table className="add-table" style={{marginTop: "20px"}}>
                            <tbody>
                                <tr>
                                    <th>No Milk</th>
                                    <th>C2 Client</th>
                                    <th>Holiday Frozen</th>
                                </tr>
                                <tr>
                                    <td><input type="checkbox" checked={currentClient["noMilk"]} id="client-nomilk" onChange={e => this.handleChangeMoreInfo("noMilk", !currentClient.noMilk)}/></td>
                                    <td><input type="checkbox" checked={currentClient["clientC2"]} id="client-c2" onChange={e =>  this.handleChangeMoreInfo("clientC2", !currentClient.clientC2)}/></td>
                                    <td><input type="checkbox" checked={currentClient["holidayFrozen"]} id="client-holidayfrozen" onChange={e => this.handleChangeMoreInfo("holidayFrozen", !currentClient.holidayFrozen)}/></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}


export default ModalContent;
