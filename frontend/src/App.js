import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import NavBar from './components/NavBar'
import Home from './components/Home'
import Login from './components/Login'
<<<<<<< HEAD

import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
=======
import Signup from './components/Signup'
>>>>>>> 9a2670b7403c10ce9c6f5104f8b6c8552cb74c20

import './css/App.css';

class App extends Component {
  render() {
    return (
    <div className="App">
      <Router>
          <NavBar/>
          <Switch>
<<<<<<< HEAD
              <PublicRoute path="/login"><Login/></PublicRoute>
              <PrivateRoute path="/signup"><Login/></PrivateRoute>
=======
              <Route path="/login"><Login/></Route>
              <Route path="/signup"><Signup/></Route>
>>>>>>> 9a2670b7403c10ce9c6f5104f8b6c8552cb74c20
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
