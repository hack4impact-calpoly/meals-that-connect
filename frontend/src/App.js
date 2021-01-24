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

import { isLoggedIn, isAuthenticated, hydrateStatewithLocalStorage} from './components/Login'

import './css/App.css';

class App extends Component {
  
  // when page is reloaded it calls function that will check if storage has a user logged in
  componentDidMount() {
    new Login().hydrateStatewithLocalStorage();
  }

  render() {
    return (
    <div className="App">
      <Router>
          <NavBar/>
          <UnAuthorize/>
          <Switch>

              <Route path="/login" component={Login}/>
              <Route path="/login/:user" component={Login}/>
              <Route path="/signup"><Signup/></Route>

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
