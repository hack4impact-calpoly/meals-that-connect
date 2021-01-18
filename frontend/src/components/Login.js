import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';

class Login extends Component {
	//this state will allow us to later on send logged user to private page
	constructor(props){
		super(props);
		this.state = { RedirectLoggedUser: false };
	}
	

	//calls authenticate which allows user to view private page
	login = () => {
		isAuthenticated.login(() =>
			this.setState({ RedirectLoggedUser: true })); // set redirect from login page to private to true
	}

    render() {

    	//check if user has logged in before redirecting them to private page
    	const { RedirectLoggedUser } = this.state;

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
    setTimeout(cb, 100) // fake async to make it seem like you are logining in
  },

  //signout
  signout(cb){
    this.isLoggedIn = false
    setTimeout(cb, 100)
  }
}


export default Login;