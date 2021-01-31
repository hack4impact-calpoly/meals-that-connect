import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { withRouter } from 'react-router-dom';

import NavBar from './components/NavBar'
import Home from './components/Home'
import Login from './components/Login'

import Signup from './components/Signup'

import Private from './components/Private'
import ResetPassword from './components/ResetPassword'

import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

import { isLoggedIn, isAuthenticated, checkTime } from './components/LoggedUser'

import './css/App.css';

class App extends Component {

  // this will check if user signed out or not
  hydrateStatewithLocalStorage() {
    let hoursPassed = checkTime();
      //console.log("first check")
      //console.log(hoursPassed)
      //console.log(hoursPassed < 1)
      //console.log(hoursPassed >= 1)
      // checks if current value of isLoggedIn is in localStorage and it is true
    if (((localStorage.hasOwnProperty("isLoggedIn") && localStorage.getItem("isLoggedIn") === "true")) &&
      ((localStorage.hasOwnProperty("time")) && (hoursPassed < 24))) {
        isAuthenticated.login();
      }
      if (((localStorage.hasOwnProperty("isLoggedIn") && localStorage.getItem("isLoggedIn") === "true")) &&
        ((localStorage.hasOwnProperty("time")) && (hoursPassed >= 24))) {
        isAuthenticated.signout();
      //}
    }
  }
  
  // when page is reloaded it calls function that will check if storage has a user logged in
  componentDidMount() {
    this.hydrateStatewithLocalStorage();
  }

  render() {
    return (
    <div className="App">
      <Router>
          <NavBar/>
          <Switch>

              <PublicRoute path="/login" component={Login}/>
              <Route path="/login/:user" component={Login}/>
              <PublicRoute path="/signup" component={Signup}/>

              <PublicRoute  path="/login" exact component={Login}/>
              <PrivateRoute path="/private" exact component={Private}/>
              <PublicRoute path="/reset-password" exact component={ResetPassword} />

              <Route><Home/></Route>
          </Switch>
      </Router>
    </div>
  )}
}

// //UnAuthorize deals with signing out the user
// export const UnAuthorize = withRouter(({ history }) => (
//     isLoggedIn() 
//       ? (<p> Click here to signout <button onClick={() => {isAuthenticated.signout(() => history.push('/login'))}}> Sign out </button> </p>)
//       : <p> Not logged in </p>
// ))


export default App;
