import React, { Component } from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom';

class Login extends Component {
	constructor(props){
		super(props);
		this.state = { RedirectLoggedUser: false };
	}

  // this will check if user signed out or not
  hydrateStatewithLocalStorage() {
    // checks if current value of isLoggedIn is in localStorage and it is true
    if (localStorage.hasOwnProperty("isLoggedIn") && localStorage.getItem("isLoggedIn") === "true")
      isAuthenticated.login();
  }

	//calls authenticate which allows user to sign in and view private page
	login = () => {
		isAuthenticated.login(() =>
			this.setState({ RedirectLoggedUser: true })); // set redirect from login page to private to true
	}

  render() {

    	const { RedirectLoggedUser } = this.state;

      // if user has signed in redirect to private page
    	if (RedirectLoggedUser === true) {
    		return (
    			<Redirect to='/private' />
    		)
    	}

      return (
            <div>
            Login

            <p> Click button to log in. </p>
            <button onClick={this.login}> Log in </button>

            </div>
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
    localStorage.setItem("isLoggedIn", "true") // helps with keeping track that someone is logged in when they refresh the page
    setTimeout(cb, 100) // fake async to make it seem like you are logining in
  },

   //signout
   signout(cb){
     this.isLoggedIn = false
     localStorage.setItem("isLoggedIn", "false")
     setTimeout(cb, 100)
   }
}


export default Login;