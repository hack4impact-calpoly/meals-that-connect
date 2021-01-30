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
		const getcurrentTime = new Date().getHours();
		const currentTime = Number(getcurrentTime);
		//console.log(currentTime);
		let getstartTime = localStorage.getItem("time");
		let startTime = Number(getstartTime);
		//console.log(currentTime !== startTime)
		

		//do a loop; incr countHours; add to start time until match w/ currentTime; add count hrs to startTime if == 24 
		while (currentTime !== startTime){

		 	startTime += 1;
		 	if (startTime === 24){
		 		startTime = 1;
		 		
		 	}
		 	countHours += 1;
		 }
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