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
        return(
    
                <div>
                    <p>Successfully submitted order!</p>
                    <div>
                        <button type="button" className="button-cancel">Close</button>
                    </div>
                </div>
        );
    }
}

export default PopupOrderSuccess;