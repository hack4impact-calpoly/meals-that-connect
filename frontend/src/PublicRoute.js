
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
//import { isLoggedIn } from './App.js';
import { isLoggedIn } from './components/Login.js';

const PublicRoute = ({component: Component, authenticated, ...rest}) => {
    return (
        <Route {...rest} render={props => (
            isLoggedIn() 
            ? <Redirect to='/' />
            : <Component {...props} />
        )} />
    );
};

export default PublicRoute;