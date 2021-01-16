import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import NavBar from './components/NavBar'
import Home from './components/Home'
import Login from './components/Login'
import Private from './components/Private'

import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

import './css/App.css';

class App extends Component {
  render() {
    return (
    <div className="App">
      <Router>
          <NavBar/>
          <Switch>
              <PublicRoute  path="/login" exact component={Login}/>
              <PrivateRoute path="/private" exact component={Private}/>
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
