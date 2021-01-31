import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { withRouter } from 'react-router-dom';

import NavBar from './components/NavBar'
import Home from './components/Home'
import Login from './components/Login'

import Signup from './components/Signup'
<<<<<<< HEAD
import SiteManagerHomepage from './components/SiteManagerHomepage'
=======
import Table from './components/mealTotals'
>>>>>>> 396b741... Table test push

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
    console.log(hoursPassed)

      // checks if current value of isLoggedIn is in localStorage and it is true
    if (((localStorage.hasOwnProperty("isLoggedIn") && localStorage.getItem("isLoggedIn") === "true")) &&
      ((localStorage.hasOwnProperty("time")) && (hoursPassed < 24))) {
        isAuthenticated.login();
      }
      if (((localStorage.hasOwnProperty("isLoggedIn") && localStorage.getItem("isLoggedIn") === "true")) &&
        ((localStorage.hasOwnProperty("time")) && (hoursPassed >= 24))) {
        isAuthenticated.signout();
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
<<<<<<< HEAD
              <PublicRoute path="/signup"><Signup/></PublicRoute>
              <PrivateRoute path="/private" exact component={Private}/>
              <PublicRoute path="/reset-password" exact component={ResetPassword} />
=======
              <Route path="/signup"><Signup/></Route>
<<<<<<< HEAD
>>>>>>> f59e28a... test0
              <Route path="/sitemanager"><SiteManagerHomepage/></Route>
=======
              <Route path="/table"><Table/></Route>
>>>>>>> 396b741... Table test push
              <Route><Home/></Route>
          </Switch>
      </Router>
    </div>
  )}
}



export default App;
