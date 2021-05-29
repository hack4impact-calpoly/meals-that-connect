import React from 'react';
import { Route } from 'react-router-dom';
import { isAuthenticated, hasPermission } from './components/authentication/authenticationUtils.js';
import Home from './components/homepage/Home'
import NoPermission from './components/NoPermission'

const PrivateRoute = ({ component: Component = null, render: Render = null, requiredUser, ...rest }) => {
    return (
        <Route {...rest} render={props => (
            isAuthenticated()
            ?   (   hasPermission(requiredUser) === true
                    ? (Render ? (Render(props)) : Component ? (<Component {...props} />) : null)
                    : <NoPermission/>
                )
            : <Home/>
        )} />
    );
};


export default PrivateRoute;
