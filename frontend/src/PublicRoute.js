
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isAuthenticated } from './components/authentication/authenticationUtils.js';

const PublicRoute = ({component: Component, authenticated, ...rest}) => {
    return (
        <Route {...rest} render={props => (
            isAuthenticated() 
            ? <Redirect to='/' />
            : <Component {...props} />
        )} />
    );
};

export default PublicRoute;