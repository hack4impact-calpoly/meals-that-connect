import React from 'react';
import { Route } from 'react-router-dom';
import { isLoggedIn, hasPermission } from './components/authentication/authenticationUtils.js';
import Home from './components/homepage/Home'
import NoPermission from './components/NoPermission'

const PrivateRoute = ({ component: Component = null, render: Render = null, requiredUser, ...rest }) => {
    console.log(requiredUser)
    console.log(isLoggedIn())
    console.log(hasPermission(requiredUser))
    return (
        <Route {...rest} render={props => (
            isLoggedIn()
            ?   (   hasPermission(requiredUser) === true
                    ? (Render ? (Render(props)) : Component ? (<Component {...props} />) : null)
                    : <NoPermission/>
                )
            : <Home/>
        )} />
    );
};


export default PrivateRoute;
