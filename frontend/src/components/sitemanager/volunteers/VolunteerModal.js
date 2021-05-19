import React, {Component} from 'react';
import Modal from 'react-modal';
import "../../../css/Modal.css";

class VolunteerModalContent extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            firstName: this.props.currentVolunteer.firstName,
            lastName: this.props.currentVolunteer.lastName,
            availability: {
                M: this.props.currentVolunteer.availability.M,
                T: this.props.currentVolunteer.availability.T,
                W: this.props.currentVolunteer.availability.W,
                Th: this.props.currentVolunteer.availability.Th,
                F: this.props.currentVolunteer.availability.F,
            },
            phoneNumber: this.props.currentVolunteer.phoneNumber,
            site: this.props.currentVolunteer.site,
            notes: this.props.currentVolunteer.notes,
            digitalSystem: this.props.currentVolunteer.digitalSystem,
            completedOrientation: this.props.currentVolunteer.completedOrientation,
            _id: this.props.currentVolunteer._id
        };
    }

    handleChangeMoreInfo = (name, value) => {
        if(name ==="availability"){
            let availability = this.state.availability
            availability[value] = !(this.state.availability[value])
            this.setState({availability: availability})
        }
        else {
            this.setState({[name]: value})
        }
    }

    render() {
        const options = [
            { value: 'None', label: 'None' },
            { value: 'M', label: 'M' },
            { value: 'T', label: 'T' },
            { value: 'W', label: 'W' },
            { value: 'Th', label: 'Th' },
            { value: 'F', label: 'F' }
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
        let currentVolunteer = this.state;
        return (
            <div style={{marginBottom: 40}}>
                <div id="modal-content">
                    <div id="client-info-header" style={{position: "fixed"}}>
                        <h1>Volunteer Information</h1>
                        <button 
                            onClick={() => this.props.submit(this.state)} 
                            style={{fontSize: "18px"}} 
                            >Exit and SAVE</button>
                        <button onClick={this.props.handleCloseModal} style={{fontSize: "18px", marginLeft: "30px"}}>{"Exit and DON'T SAVE"}</button>
                    </div>
                    <div id="client-info-body">
                        <div className="two-column">
                            <div><label for="client-firstname">First Name</label></div>
                            <div><label for="client-lastname">Last Name</label></div>
                            <div><input 
                                    type="text" 
                                    value={currentVolunteer.firstName} 
                                    id="client-firstname" 
                                    onChange={e =>  this.handleChangeMoreInfo("firstName", e.target.value)}/></div>
                            <div><input 
                                    type="text" 
                                    value={currentVolunteer.lastName} 
                                    id="client-lastname"
                                    onChange={e =>  this.handleChangeMoreInfo("lastName", e.target.value)}/></div>
                        </div>
                        
                        
                        <label>Availability</label>
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
                                    <td><input type="checkbox" checked={currentVolunteer["availability"]["M"]} id="client-foodday-m" onChange={e =>  this.handleChangeMoreInfo("availability", "M")}/></td>
                                    <td><input type="checkbox" checked={currentVolunteer["availability"]["T"]} id="client-foodday-t" onChange={e =>  this.handleChangeMoreInfo("availability", "T")}/></td>
                                    <td><input type="checkbox" checked={currentVolunteer["availability"]["W"]} id="client-foodday-w" onChange={e =>  this.handleChangeMoreInfo("availability", "W")}/></td>
                                    <td><input type="checkbox" checked={currentVolunteer["availability"]["Th"]} id="client-foodday-th" onChange={e =>  this.handleChangeMoreInfo("availability", "Th")}/></td>
                                    <td><input type="checkbox" checked={currentVolunteer["availability"]["F"]} id="client-foodday-f" onChange={e =>  this.handleChangeMoreInfo("availability", "F")}/></td>
                                </tr>
                            </tbody>
                        </table>
                        <br/>

                        <label for="client-phone">Phone Number</label><br/>
                        <input type="text" value={currentVolunteer["phoneNumber"]} id="client-phone" style={{width: "1130px"}} onChange={e =>  this.handleChangeMoreInfo("phoneNumber", e.target.value)}/><br/>
                        
                    </div>
                </div>
            </div>
        );
    }
}

export default VolunteerModalContent;