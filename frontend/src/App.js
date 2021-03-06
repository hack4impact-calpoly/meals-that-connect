import React, { Component } from 'react';
import { BrowserRouter as Router, Switch } from "react-router-dom";

import NavBar from './components/navbar/NavbarWrapper'
import Home from './components/homepage/Home'
import Login from './components/authentication/Login'

import Signup from './components/authentication/Signup'
import AdminSignup from './components/authentication/AdminSignup'
import HomePageWrapper from './components/HomepageWrapper'
import RouteHomePage from './components/sitemanager/routes/RouteHomepage.js'
import VolunteerHours from './components/sitemanager/volunteers/VolunteerHoursOverview'
import AddVolunteer from "./components/sitemanager/volunteers/addVolunteer.js"
import EmailVerification from "./components/authentication/EmailVerification.js"

import VolunteerOverview from './components/sitemanager/volunteers/VolunteerOverview'
import VolunteerSchedule from './components/sitemanager/volunteers/VolunteerSchedule'
import VolunteerInfo from './components/volunteer/VolunteerInfo'

import ClientTableContainer from './components/sitemanager/clients/ClientTableContainer.js'
import AddClient from "./components/sitemanager/clients/addClient.js"
import EditClient from './components/sitemanager/clients/EditClient.js'

import ResetPassword from './components/authentication/ResetPassword'
import NoPermission from './components/NoPermission'

import LogHours from './components/volunteer/LogHours'
//import showSchedule from './components/volunteer/showSchedule'

import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

import { isAuthenticated, printStorage, decodeToken } from './components/authentication/authenticationUtils.js';

import './css/App.css';
import Profile from './components/Profile';
import showSchedule from './components/volunteer/showSchedule';

class App extends Component {
  constructor(props) {
        super(props);
        this.state = { loaded: false};
    }

  // when page is reloaded it calls function that will check if storage has a user logged in
  componentDidMount() {
    printStorage();
    isAuthenticated();
    if (!this.state.loaded) {
      this.setState({loaded: true})
    }
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
              <PublicRoute path="/admin-signup" component={AdminSignup}/>
              <PublicRoute path="/reset-password" exact component={ResetPassword} />              
              <PublicRoute exact path="/email-verification" component={EmailVerification}/>
              <PublicRoute path="/no-permission" component={NoPermission}/>


              <PrivateRoute requiredUser="none" path="/profile" component={Profile}/>
              <PrivateRoute requiredUser="none" path="/no-permission" component={NoPermission}/>

              <PrivateRoute requiredUser={["site-manager", "data-entry"]} exact path = "/routes" component={RouteHomePage}/>
              <PrivateRoute requiredUser={["site-manager", "data-entry"]} exact path="/volunteer" component={VolunteerOverview}/>
              <PrivateRoute requiredUser={["site-manager", "data-entry"]} exact path = "/add-volunteer" component={AddVolunteer}/>
              <PrivateRoute requiredUser={["site-manager", "data-entry"]} exact path="/clients" component={ClientTableContainer}/>
              <PrivateRoute requiredUser={["site-manager", "data-entry"]} exact path = "/add-client" component={AddClient}/>
              <PrivateRoute requiredUser={["site-manager", "data-entry"]} exact path="/edit-client" component={EditClient}/>
              <PrivateRoute requiredUser={["site-manager", "data-entry"]} exact path="/volunteer-hours" component={VolunteerHours}/>
              <PrivateRoute requiredUser={["site-manager", "data-entry"]} exact path="/volunteer-schedule" component={VolunteerSchedule}/>

              <PrivateRoute requiredUser="data-entry" exact path="/clients-data-entry" component={ClientTableContainer}/>
              <PrivateRoute requiredUser="data-entry" exact path="/volunteer-data-entry" component={VolunteerOverview}/>
              <PrivateRoute requiredUser="data-entry" exact path = "/routes-data-entry" component={RouteHomePage}/>

              <PrivateRoute requiredUser="volunteer" exact path="/volunteer-additional-info" component={VolunteerInfo}/>
              <PrivateRoute requiredUser="volunteer" path="/log-hours" component={LogHours}/>
              <PrivateRoute requiredUser="volunteer" path="/show-my-schedule" component={showSchedule}/>
              <PrivateRoute requiredUser="data-entry" exact path = "/routes-data-entry" component={RouteHomePage}/>
              <PrivateRoute requiredUser="none" path="/" component={HomePageWrapper}/>
              

          </Switch>
      </Router>
    </div>
  )}
}



export default App;
