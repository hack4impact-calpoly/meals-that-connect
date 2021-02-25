import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { withRouter } from 'react-router-dom';

import NavBar from './components/NavBar'
import Home from './components/homepage/Home'
import Login from './components/authentication/Login'

import Signup from './components/authentication/Signup'
import HomePageWrapper from './components/HomepageWrapper'
import RouteHomePage from './components/sitemanager/RouteHomepage.js'
import VolunteerHours from './components/VolunteerHoursOverview'

import VolunteerOverview from './components/VolunteerOverview'
import VolunteerInfo from './components/VolunteerInfo'

import Private from './components/authentication/Private'
import ResetPassword from './components/authentication/ResetPassword'
import NoPermission from './components/NoPermission'

import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

import { isAuthenticated } from './components/authentication/authenticationUtils.js';

import './css/App.css';

class App extends Component {
  
  // when page is reloaded it calls function that will check if storage has a user logged in
  componentDidMount() {
    isAuthenticated();
  }

  //when initializing your private route links please include a requiredUser property!
  //format is [data-entry, site-manager, volunteer] or none if all users can access that link as long as they're logged in
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

              <PrivateRoute requiredUser="none" path="/signout" exact component={Private}/>
              <PrivateRoute requiredUser="none" exact path="/" component={HomePageWrapper}/>
              <PrivateRoute requiredUser="none" path="/no-permission" component={NoPermission}/>
              <PrivateRoute requiredUser="site-manager" path="/routes" component={RouteHomePage}/>
              <PrivateRoute requiredUser="none" exact path="/volunteer" component={VolunteerOverview}/>
              <PrivateRoute requiredUser="none" exact path="/volunteer-hours" component={VolunteerHours}/>
              <PrivateRoute requiredUser="volunteer" exact path="/volunteer-additional-info" component={VolunteerInfo}/>
          </Switch>
      </Router>
    </div>
  )}
}



export default App;
