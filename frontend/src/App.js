import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import NavBar from './components/NavBar'
import Home from './components/Home'
import Login from './components/Login'
import Signup from './components/Signup'
import Table from './components/mealTotals'

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
              <Route path="/table"><Table/></Route>
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
