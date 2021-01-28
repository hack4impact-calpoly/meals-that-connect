import React, { Component } from 'react';
import { isAuthenticated } from './Login'
import { withRouter, Redirect } from 'react-router-dom';

class Private extends Component {
	constructor(props){
		super(props);
		this.state = { RedirectLoggedUser: false };
	}

	signOut = () => {
		isAuthenticated.signout(() => 
			this.setState({ RedirectLoggedUser: true }));
	}


    render() {

    	const { RedirectLoggedUser } = this.state;

        // if user has signed in redirect to private page
        if (RedirectLoggedUser === true) {
          return (
            <Redirect to='/private' />
          )
        }

        return (
            <div className="Private">
            <h2> Private </h2>
            <p> Sign out button bellow is a prototype to test signout. </p> 
            <button onClick={this.signOut}> Sign out </button>
            </div>
        );
    }
}

export default Private;