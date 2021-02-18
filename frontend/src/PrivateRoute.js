import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isLoggedIn, hasPermission } from './components/authentication/authenticationUtils.js';
import Home from './components/homepage/Home'

const PrivateRoute = ({ component: Component = null, render: Render = null, requiredUser, ...rest }) => {
    return (
        <Route {...rest} render={props => (
            isLoggedIn()
            ?   (   hasPermission(requiredUser)
                    ? (Render ? (Render(props)) : Component ? (<Component {...props} />) : null)
                    : <Redirect to="/no-permission"/>
                )
            : <Home/>
        )} />
    );
};


export default PrivateRoute;
