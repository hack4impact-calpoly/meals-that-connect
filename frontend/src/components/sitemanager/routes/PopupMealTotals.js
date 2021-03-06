import React, { Component } from 'react';
import Popup from "reactjs-popup";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../../css/manager.css'

class PopupMealTotals extends Component {
    constructor(props) {
        super(props);
        this.state = {showSuccess:false };
    }

    submitActions()
    {
        this.addOrder()
        this.props.showModal()
    }

    getOrderDetails() {
        let site = localStorage.getItem("site")
        let {totals, day, weekArr} = this.props
        let order = {
            site: site,
            date: weekArr[day+1],
            token: localStorage.getItem("token"),
            frozen: 0,
            whiteBag: 0,
            brownBag: 0,
        };
        totals.forEach(meal => {
            order.frozen += meal["frozen"][day]
            order.brownBag += meal["meals"][day]
            order.whiteBag += meal["whitebag"][day]
        })
        return order
    }

    async addOrder(){
        let order = this.getOrderDetails()
        let response = await fetch(process.env.REACT_APP_SERVER_URL + 'orders/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(order)
        })
        const data = await response.json();
        this.setState({showSuccess: true})
    }


    render()
    {
        return(
        <div>
        <Popup trigger = {
            <button type="button" className="route" style={{width: 165}}>{getWeekday(this.props.day)}</button>
            } modal>
            {close => (
                <div>
                    <p id="popup">Are you sure you'd like to submit your meal orders for <b>{getDate(this.props.weekArr, this.props.day)}</b>? 
                        They will be shared with the kitchen staff once you submit. 
                        You'll still be able to go back and resubmit the order until <b>{getDeadline(this.props.weekArr, this.props.day)}</b>.</p>
                    <div id = "button-div">
                        <button type="button" className="button-cancel"  onClick={() => {close();}}>Cancel</button>
                        <button type="button" className="button-submit" onClick= {() => {this.submitActions(); close();}}>Submit</button>
                    </div>
                </div>
            )}
        </Popup>
        </div>
        )
    }
}


function getFoodDay(day){
    var weekday = [];
    weekday[0] = "M";
    weekday[1] = "T";
    weekday[2] = "W";
    weekday[3] = "Th";
    weekday[4] = "F";
    var d = weekday[day];
    return d;
}

function getWeekday(day){
    var weekday = [];
    weekday[0] = "Monday";
    weekday[1] = "Tuesday";
    weekday[2] = "Wednesday";
    weekday[3] = "Thursday";
    weekday[4] = "Friday";
    var d = weekday[day];
    return d;
}

function getDateObj(weekArr, tableDay){
    let curr;
    if (weekArr.length === 1)
    {
      curr = new Date();
    }
    else
    {
      curr = new Date(weekArr[0]);
    }
    let week = [];
  
    for (let i = 1; i <= 7; i++) {
      let first = curr.getDate() - curr.getDay() + i;
      let day = new Date(curr.setDate(first));
      week.push(day);
    }
  
    return week[tableDay];
}

function getDate(weekArr, tableDay) {
    let curr;
    if (weekArr.length === 1)
    {
      curr = new Date();
    }
    else
    {
      curr = new Date(weekArr[0]);
    }
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

function getDeadline(weekArr, tableDay) {
    let curr;
    if (weekArr.length === 1)
    {
      curr = new Date();
    }
    else
    {
      curr = new Date(weekArr[0]);
    }
    let week = [];
    for (let i = 1; i <= 7; i++) {
      let first = curr.getDate() - curr.getDay() + i;
      let day = new Date(curr.setDate(first));
      if (tableDay < 3)
        day.setDate(day.getDate()-7);
      let month = day.getMonth() + 1;
      let date = day.getDate();
      let year = day.getFullYear();
      let mdy = month + "/" + date + "/" + year;
      week.push(mdy);
    }
    if (tableDay < 3)
        return week[tableDay+2];
    return week[tableDay-3];
}


export default PopupMealTotals;