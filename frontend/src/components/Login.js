import React, { Component } from 'react';

class Login extends Component {

	// isLoggedIn = () => {
 //  		return isAuthenticated.isLoggedIn;
	// }

	// isAuthenticated() {
 //  		isLoggedIn: false,

 //  		//login in 
 //  		const login(cb) {
 //  		//check database to verify authentication
 //    	this.isLoggedIn = true
 //    	setTimeout(cb, 100) // fake async to make it seem like you are logining in
 //  		},

 //  		//signout
 //  		signout(cb){
 //    	this.isLoggedIn = false
 //    	setTimeout(cb, 100)
 //  		}
	// }

    render() {

        return (
            <div>Login</div>
        );
    }
 }

export const isLoggedIn = () => {
  return isAuthenticated.isLoggedIn;
}

export const isAuthenticated = {
  isLoggedIn: false,

  //login in 
  login(cb){
    this.isLoggedIn = true
    setTimeout(cb, 100) // fake async to make it seem like you are logining in
  },

  //signout
  signout(cb){
    this.isLoggedIn = false
    setTimeout(cb, 100)
  }
}


export default Login;