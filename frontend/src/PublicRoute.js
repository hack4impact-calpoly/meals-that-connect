
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isLoggedIn } from './components/authentication/authenticationUtils.js';

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