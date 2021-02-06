import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isLoggedIn } from './components/LoggedUser.js';

const PrivateRoute = ({ component: Component = null, render: Render = null, ...rest }) => {
    return (
        <Route {...rest} render={props => (
            isLoggedIn() 
            ? (Render ? (Render(props)) : Component ? (<Component {...props} />) : null)
            : <Redirect to=  '/login'/>
        )} />
    );
};


export default PrivateRoute;
