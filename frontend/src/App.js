import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import NavBar from './components/NavBar'
import Home from './components/Home'
import Login from './components/Login'

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
              <PublicRoute path="/login"><Login/></PublicRoute>
              <PrivateRoute path="/signup"><Login/></PrivateRoute>
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
