import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { withRouter } from 'react-router-dom';

import NavBar from './components/NavBar'
import Home from './components/Home'
import Login from './components/Login'

import Signup from './components/Signup'

import Private from './components/Private'

import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

import { isLoggedIn, isAuthenticated} from './components/Login'

import './css/App.css';

class App extends Component {

  // this will check if user signed out or not
    hydrateStatewithLocalStorage() {
      const currentTime = new Date();
      // checks if current value of isLoggedIn is in localStorage and it is true
      if (((localStorage.hasOwnProperty("isLoggedIn") && localStorage.getItem("isLoggedIn") === "true")) && 
        (localStorage.hasOwnProperty("time")) && (localStorage.getItem("time") + 24 < currentTime.getHour())){
        isAuthenticated.login();
      }
      if ((localStorage.hasOwnProperty("time")) && localStorage.getItem("time") + 24 > currentTime.getHour()){
        isAuthenticated.signout();
        //redirect back to login
      }
    }
  
  // when page is reloaded it calls function that will check if storage has a user logged in
  componentDidMount() {
    //this.hydrateStatewithLocalStorage();
  }

  render() {
    return (
    <div className="App">
      <Router>
          <NavBar/>
          <Switch>

              <PublicRoute path="/login" component={Login}/>
              <Route path="/login/:user" component={Login}/>
              <PublicRoute path="/signup"><Signup/></PublicRoute>

              <PublicRoute  path="/login" exact component={Login}/>
              <PrivateRoute path="/private" exact component={Private}/>

              <Route><Home/></Route>
          </Switch>
      </Router>
    </div>
  )}
}

//UnAuthorize deals with signing out the user
export const UnAuthorize = withRouter(({ history }) => (
    isLoggedIn() 
      ? (<p> Click here to signout <button onClick={() => {isAuthenticated.signout(() => history.push('/login'))}}> Sign out </button> </p>)
      : <p> Not logged in </p>
))


export default App;
