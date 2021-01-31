import React, { Component } from 'react';

import '../css/Login.css';
import '../css/Signup.css';
import { Route, Redirect, Link } from 'react-router-dom';
import {isAuthenticated} from './LoggedUser';

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            isLoggedIn : false,
            RedirectLoggedUser: false,
            userType: this.props.match.params.user ? this.props.match.params.user : ""
        };
    }

    // // this will check if user signed out or not
    // hydrateStatewithLocalStorage() {
    //   // checks if current value of isLoggedIn is in localStorage and it is true
    //   if (localStorage.hasOwnProperty("isLoggedIn") && localStorage.getItem("isLoggedIn") === "true")
    //     isAuthenticated.login();
    // }

    //calls authenticate which allows user to sign in and view private page
    login = () => {
      isAuthenticated.login(() =>
        this.setState({ RedirectLoggedUser: true })); // set redirect from login page to private to true
        this.storeLoginUser();
        console.log(localStorage.getItem("time"));
        //console.log()
        //console.log()
    }

    storeLoginUser = () => {
        const date = new Date();
        localStorage.setItem("userEmail", document.getElementById("email"));
        localStorage.setItem("userType", this.userType)
        localStorage.setItem("site", "login");
        localStorage.setItem("time", date.getHours());
    }

    isNotLoggedIn = () => {
        this.setState( { isLoggedIn : false } );
    }

    isLoggedIn = () => {
        this.setState( { isLoggedIn : true } );
    }

    passwordVisibility = () => {
        var password = document.getElementById("password");
        if (password.type === "password") {
            password.type = "text";
        } else {
            password.type = "password";
        }
    }

    changeUserType = (event) => {
        this.setState({userType: event.target.value});
    }

    render() {
        console.log(this.state.userType)

        const { RedirectLoggedUser } = this.state;

        // if user has signed in redirect to private page
        if (RedirectLoggedUser === true) {
          return (
            <Redirect to='/private' />
          )
        }

        return (
            <div className="login-form">
                <h2>Login</h2>
                <div id="cta-type">
                    <input type="radio" id="siteManager" name="cta" value="siteManager" onChange={this.changeUserType}/>
                    <label for="siteManager">Manager</label>
                    <input type="radio" id="data-entry" name="cta" value="data-entry" onChange={this.changeUserType}/>
                    <label for="data-entry">Data Entry</label>
                    <input type="radio" id="volunteer" name="cta" value="volunteer" onChange={this.changeUserType}/>
                    <label for="volunteer">Volunteer</label>
                </div>
                <input type="text" id="email" placeholder="Email" size="50"/>
                <br/>
                <input type="password" id="password" placeholder="Password" size="50"/>
                <br/>
                <label class="password-security">
                    <input type="checkbox" id="password-visibility" onClick={() => this.passwordVisibility()}/>
                    Show Password
                </label>
                <br/>
                <button id="signin-button" onClick={this.login}>Log In</button>
                <Link to="/reset-password">Forgot Password?</Link>
            </div>
          )}
    }


// export const isLoggedIn = () => {
//     return isAuthenticated.isLoggedIn;
//  }


// export const isAuthenticated = { 
//    isLoggedIn: false,

//    //login in 
//    login(cb){
//     this.isLoggedIn = true
//     localStorage.setItem("isLoggedIn", "true") // helps with keeping track that someone is logged in when they refresh the page
//     setTimeout(cb, 100) // fake async to make it seem like you are logining in
//   },

//    //signout
//    signout(cb){
//      this.isLoggedIn = false
//      localStorage.setItem("isLoggedIn", "false")
//      localStorage.removeItem("userEmail");
//      localStorage.removeItem("site");
//      localStorage.removeItem("time");
//      setTimeout(cb, 100)
//    }
// }


export default Login;

