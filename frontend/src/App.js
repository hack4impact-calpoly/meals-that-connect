import React, { Component } from 'react';
import { BrowserRouter as Router, Switch } from "react-router-dom";

import NavBar from './components/navbar/NavbarWrapper'
import Home from './components/homepage/Home'
import Login from './components/authentication/Login'

import Signup from './components/authentication/Signup'
import MasterSignup from './components/authentication/MasterSignup'
import HomePageWrapper from './components/HomepageWrapper'
import RouteHomePage from './components/sitemanager/routes/RouteHomepage.js'
import VolunteerHours from './components/sitemanager/volunteers/VolunteerHoursOverview'
import AddVolunteer from "./components/sitemanager/volunteers/addVolunteer.js"
import EmailVerification from "./components/authentication/EmailVerification.js"

import VolunteerOverview from './components/sitemanager/volunteers/VolunteerOverview'
import VolunteerInfo from './components/volunteer/VolunteerInfo'

import ClientTableContainer from './components/sitemanager/clients/ClientTableContainer.js'
import AddClient from "./components/sitemanager/clients/addClient.js"
import EditClient from './components/sitemanager/clients/EditClient.js'

import Private from './components/authentication/Private'
import ResetPassword from './components/authentication/ResetPassword'
import NoPermission from './components/NoPermission'

import LogHours from './components/volunteer/LogHours'

import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

import { isAuthenticated, isLoggedIn, printStorage } from './components/authentication/authenticationUtils.js';

import './css/App.css';
import Profile from './components/Profile';

class App extends Component {
  constructor(props) {
        super(props);
        this.state = { isLoggedIn: isLoggedIn};
    }

  // when page is reloaded it calls function that will check if storage has a user logged in
  componentDidMount() {
    printStorage();
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
              <PublicRoute path="/master-signup" component={MasterSignup}/>
              <PublicRoute path="/reset-password" exact component={ResetPassword} />              
              <PublicRoute exact path="/email-verification" component={EmailVerification}/>
              <PublicRoute path="/no-permission" component={NoPermission}/>


              <PrivateRoute requiredUser="none" path="/profile" component={Profile}/>
              <PrivateRoute requiredUser="none" path="/signout" component={Private}/>
              <PrivateRoute requiredUser="none" path="/no-permission" component={NoPermission}/>
              <PrivateRoute requiredUser="site-manager" exact path = "/routes"><RouteHomePage /></PrivateRoute>
              <PrivateRoute requiredUser="site-manager" exact path="/volunteer"><VolunteerOverview /></PrivateRoute>
              <PrivateRoute requiredUser="site-manager" exact path = "/add-volunteer"><AddVolunteer /></PrivateRoute>
              <PrivateRoute requiredUser="site-manager" exact path="/clients"><ClientTableContainer /></PrivateRoute>
              <PrivateRoute requiredUser="site-manager" exact path = "/add-client"><AddClient /></PrivateRoute>
              <PrivateRoute requiredUser="site-manager" exact path="/edit-client"><EditClient /></PrivateRoute>
              <PrivateRoute requiredUser="site-manager" exact path="/volunteer-hours"><VolunteerHours /></PrivateRoute>
              <PrivateRoute requiredUser="volunteer" exact path="/volunteer-additional-info"><VolunteerInfo /></PrivateRoute>
              <PrivateRoute requiredUser="volunteer" path="/log-hours" component={LogHours}/>
              <PrivateRoute requiredUser="none" path="/" component={HomePageWrapper}/>
              

          </Switch>
      </Router>
    </div>
  )}
}



export default App;
