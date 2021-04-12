import React, { Component } from 'react';
import { HashLink as Link } from "react-router-hash-link";
import Popup from "reactjs-popup";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../css/manager.css'

class PopupMealTotals extends Component {

    render()
    {
        return(
        <Popup trigger = {
            <button type="button" className="route" style={{marginTop: 20,width: 300}}>Finalize Meal Totals</button>
            } modal>
            {close => (
                <div>
                    <p id="popup">Are you sure you'd like to submit your meal orders? 
                        They will be shared with the kitchen staff once you submit. 
                        You'll still be able to go back and resubmit the order until {getDate(3)}.</p>
                    <div id = "popup-div">
                        <button type="button" className="popup-button-cancel"  onClick={() => {close();}}>Cancel</button>
                        <Link to="/">
                            <button type="button" className="popup-button-submit">Submit</button>
                        </Link>
                    </div>
                </div>
            )}
        </Popup>
        )
    }
}

function getDate(tableDay) {
    let curr = new Date();
    let week = [];
  
    for (let i = 1; i <= 7; i++) {
      let first = curr.getDate() - curr.getDay() + i;
      let day = new Date(curr.setDate(first));
      let month = day.getMonth() + 1;
      let date = day.getDate();
      let year = day.getFullYear();
      let mdy = month + "/" + date + "/" + year;
      week.push(mdy);
    }
  
    return week[tableDay];
  }


export default PopupMealTotals;