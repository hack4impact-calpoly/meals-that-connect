import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isLoggedIn } from './App.js';

const PrivateRoute = ({ component: Component = null, render: Render = null, ...rest }) => {
    return (
        <Route {...rest} render={props => (
            isLoggedIn() 
            ? (Render ? (Render(props)) : Component ? (<Component {...props} />) : null)
            : <Redirect to="/Login" />
        )} />
    );
};

// const PrivateRoute = ({ component: Component = null, render: Render = null, ...rest }) => {
//     const authService = new AuthService();
  
//     return (
//       <Route
//         {...rest}
//         render={props =>
//           authService.isAuthenticated ? (Render ? (Render(props)) : Component ? (<Component {...props} />) : null) 
//           : (<Redirect to={{ pathname: '/login', state: { from: props.location } }} />)
//         }
//       />
//     );
//   }

export default PrivateRoute;