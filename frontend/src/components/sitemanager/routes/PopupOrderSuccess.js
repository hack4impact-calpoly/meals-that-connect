import React, { Component } from 'react';
import Popup from "reactjs-popup";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../../css/manager.css'

class PopupOrderSuccess extends Component {
    constructor(props) {
        super(props);
        this.state = { };
    }

    render()
    {
        const {showSuccess} = this.props.show
        return <>
        {showSuccess && <Popup>
            {close => (
                <div>
                    <p id="popup">Successfully submitted order!</p>
                    <div id = "popup-div">
                        <button type="button" className="popup-button-cancel"  onClick={() => {close();}}>Close</button>
                    </div>
                </div>
            )}
        </Popup>}
        </>;
    }
}

export default PopupOrderSuccess;