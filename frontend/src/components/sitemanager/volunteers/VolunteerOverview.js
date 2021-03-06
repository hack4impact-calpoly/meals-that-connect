import React, { Component } from 'react';
import Spinner from "react-bootstrap/Spinner"
import 'bootstrap/dist/css/bootstrap.min.css';
import VolunteerOverviewTable from './VolunteerOverviewTable';
import VolunteerNavbar from './VolunteerNavbar';
import Modal from 'react-modal';
import VolunteerModal from './VolunteerModal';

class VolunteerOverview extends Component {
    constructor(props) {
        super(props);
        this.state = {
            volunteers: [],
            loaded: false,
            week: [],
            holiday: [],
            showModal: false,
            currentVolunteer: {
                volunteerID: null,
                firstName: null,
                lastName: null,
                email: null,
                password: null,
                driver: null,
                kitchenStaff: null,
                isAuthenticated_driver: null,
                isAuthenticated_kitchenStaff: null,
                site: null,
                phoneNumber: null,
                availability: {
                    M: null,
                    T: null,
                    W: null,
                    Th: null,
                    F: null
                },
                notes: null,
                digitalSystem: null,
                completedOrientation: null,
                admin: null,
                _id: null
            }
        };
    }

    updateWeek = (week) => {
        this.setState({weekArr: week})
    }

    updateHoliday = (holidays) => {
        this.setState({holidayArr: holidays})
    }

    async componentDidMount(){
        let info = {
            site: localStorage.getItem("site"),
            token: localStorage.getItem("token")
        }
        let response = await fetch(process.env.REACT_APP_SERVER_URL + 'volunteers/volunteerSite', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(info)
        })
        const data = await response.json();
        
        this.setState({volunteers: data, loaded: true})
    }

    componentWillMount() {
        Modal.setAppElement('body');
    }

    handleOpenModal = async (id) => {
        let volunteerID = {
            _id: id,
            token: localStorage.getItem("token")
        }
        let response = await fetch(process.env.REACT_APP_SERVER_URL + 'volunteers/id', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(volunteerID)
        })
        let volunteer = await response.json()
        this.setState({currentVolunteer: volunteer, showModal: true})
    }

    handleCloseModal = () => {
        this.setState({showModal: false});
    }

    refreshData = (volunteer) =>
    {
        this.setState({volunteers: this.state.volunteers})
    }

    submit = async (newVolunteer, date) => {
        let updateWeekly = {
            date: date,
            volunteer: newVolunteer
        }
        let updateConstant = {
            id: newVolunteer._id,
            firstName: newVolunteer.firstName,
            lastName: newVolunteer.lastName,
            availability: newVolunteer.availability,
            phoneNumber: newVolunteer.phoneNumber,
            site: newVolunteer.site,
            notes: newVolunteer.notes,
            digitalSystem: newVolunteer.digitalSystem,
            completedOrientation: newVolunteer.completedOrientation,
            token: localStorage.getItem("token")
        }
        /*Update Constant Fields*/
        await fetch(process.env.REACT_APP_SERVER_URL + 'volunteers/update-volunteer', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updateConstant)
        })
        window.location.reload()
    }

    render() {
        return (
            <div >
                <h1 className="site-manager-page-header">Volunteer Overview</h1>
                <VolunteerNavbar updateWeek={this.updateWeek} updateHoliday={this.updateHoliday}/>
                <div className="site-manager-container">
                    {this.state.loaded === true ? 
                        <VolunteerOverviewTable data={this.state.volunteers} showModal={this.handleOpenModal} refreshData={this.refreshData}/> : 
                    <div id = "spin">
                        <Spinner animation="border" role="status" style={{width:'70px', height:'70px', left: '50%', right: '40%', top: '40%', display: 'block', position:'absolute'}}/>
                    </div>}
                </div>
                <Modal isOpen={this.state.showModal} onRequestClose={this.handleCloseModal} className="Modal-client" overlayClassName="Overlay">
                    <VolunteerModal
                        currentVolunteer={this.state.currentVolunteer}
                        submit={this.submit}
                        handleCloseModal={this.handleCloseModal}/>
                </Modal>
            </div>
        );
    }
}

export default VolunteerOverview;
