import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import NavBar from './components/NavBar'
import Home from './components/Home'
import Login from './components/Login'
import Signup from './components/Signup'
<<<<<<< HEAD
import SiteManagerHomepage from './components/SiteManagerHomepage'
=======
import Table from './components/mealTotals'
>>>>>>> 396b741... Table test push

import './css/App.css';

class App extends Component {
  render() {
    return (
    <div className="App">
      <Router>
          <NavBar/>
          <Switch>
              <Route path="/login" component={Login}/>
              <Route path="/login/:user" component={Login}/>
              <Route path="/signup"><Signup/></Route>
<<<<<<< HEAD
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

export const isLoggedIn = () => {
  return false;
}

export default App;
