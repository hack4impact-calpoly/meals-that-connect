import React, { Component } from 'react';
import Popup from "reactjs-popup";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../css/manager.css'

class DeleteCVPopup extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }    

    render()
    {
        return(
        <div>
        <Popup trigger = {
            <div style={{justifyContent: 'center', width: 100, cursor: 'pointer'}}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path d="M3 6v18h18v-18h-18zm5 14c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm4-18v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.315c0 .901.73 2 1.631 2h5.712z"/>
            </svg></div> } modal>
            {close => (
                <div>
                    <p id="popup">Are you sure you'd like to remove <b>{this.props.person["firstName"]}  {this.props.person["lastName"]}</b>? </p>
                    <div id = "popup-div">
                        <button type="button" className="popup-button-cancel"  onClick={() => {close();}}>Cancel</button>
                        <button type="button" className="popup-button-submit" onClick= {() => {remove(this.props.person, this.props.type); close();}}>Remove</button>
                    </div>
                </div>
            )}
        </Popup>
        </div>
        )
    }
}

async function remove(person, type)
    { 
    const current = person
    const currID = current["_id"]
    const updateData = {
        id: currID
    }
    if(type == "client")
    {
        await fetch(process.env.REACT_APP_SERVER_URL + 'clients/delete', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updateData)
        })
    }   
    else if(type == "volunteer")
    {
        await fetch(process.env.REACT_APP_SERVER_URL + 'volunteers/delete', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updateData)
        })
    }
    window.location.reload(false); 
}

export default DeleteCVPopup;