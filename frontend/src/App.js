import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { withRouter } from 'react-router-dom';

import NavBar from './components/NavBar'
import Home from './components/homepage/Home'
import Login from './components/authentication/Login'

import Signup from './components/authentication/Signup'
import SiteManagerHomepage from './components/sitemanager/SiteManagerHomepage.js'
import RouteHomePage from './components/sitemanager/RouteHomepage.js'

import VolunteerOverview from './components/VolunteerOverview'

import Private from './components/authentication/Private'
import ResetPassword from './components/authentication/ResetPassword'

import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

import { isAuthenticated } from './components/authentication/authenticationUtils.js';

import './css/App.css';

class App extends Component {
  
  // when page is reloaded it calls function that will check if storage has a user logged in
  componentDidMount() {
    isAuthenticated();
  }

  render() {
    return (
    <div className="App">
      <Router>
          <NavBar/>
          <Switch>
              <PublicRoute path="/login" component={Login}/>
              <PublicRoute path="/login/:user" component={Login}/>
              <PublicRoute path="/signup" component={Signup}/>
              <PublicRoute path="/reset-password" exact component={ResetPassword} />

              <PrivateRoute path="/signout" exact component={Private}/>
              <PrivateRoute path="/sitemanager" component={SiteManagerHomepage}/>
              <PrivateRoute path="/routes" component={RouteHomePage}/>
              <PrivateRoute exact path="/volunteer" component={VolunteerOverview}/>
              <Route><Home/></Route>
          </Switch>
      </Router>
    </div>
  )}
}



export default App;
