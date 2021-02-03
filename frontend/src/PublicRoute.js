
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isLoggedIn } from './components/LoggedUser.js';

const PublicRoute = ({component: Component, authenticated, ...rest}) => {
	console.log(isLoggedIn())
    return (
        <Route {...rest} render={props => (
            isLoggedIn() 
            ? <Redirect to='/' />
            : <Component {...props} />
        )} />
    );
};

export default PublicRoute;