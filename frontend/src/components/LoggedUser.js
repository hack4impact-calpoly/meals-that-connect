import React, { Component } from 'react';


class LoggedUser extends Component{
	constructor(props){
		super(props);
		this.state = {  }
	}


}

//how much long has user been loggedin?

export const checkTime = () => {
	let countHours = 0;
	if (localStorage.hasOwnProperty("isLoggedIn") && localStorage.hasOwnProperty("time")){
		const currentTime = new Date();
		//console.log(currentTime);

		//localStorage.getItem("time") was strored as a string, so we have to convert it as a date again
		let getStartTime = localStorage.getItem("time");
		let startTime = new Date(getStartTime);
		//console.log(startTime);

		//get difference in milliseconds
		const diff = Math.abs(currentTime - startTime)
		console.log(diff)
		//get difference in hours
		const hours = Math.ceil(diff / (1000 * 60 * 60));
		console.log(hours)
		
		countHours = hours;
	}
	return countHours;
}

export const isLoggedIn = () => {
    return isAuthenticated.isLoggedIn;
}


export const isAuthenticated = { 
   	isLoggedIn: false,

   	//login in 
   	login(cb){
    this.isLoggedIn = true
    localStorage.setItem("isLoggedIn", "true") // helps with keeping track that someone is logged in when they refresh the page
    setTimeout(cb, 100) // fake async to make it seem like you are logining in
  	},

   	//signout
   	signout(cb){
    this.isLoggedIn = false
    localStorage.setItem("isLoggedIn", "false")
    localStorage.removeItem("userEmail");
    localStorage.removeItem("site");
    localStorage.removeItem("time");
    setTimeout(cb, 100)
   	}
}

export default LoggedUser;