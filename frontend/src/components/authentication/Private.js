import React, { Component } from 'react';
import { signout } from './authenticationUtils';
import { withRouter, Redirect } from 'react-router-dom';

class Private extends Component {
	constructor(props){
		super(props);
		this.state = { RedirectLoggedUser: false };
	}

	signOut = () => {
		signout()
    this.setState({ RedirectLoggedUser: true });
	}


    render() {

    	const { RedirectLoggedUser } = this.state;

        // if user has signed in redirect to private page
        if (RedirectLoggedUser === true) {
          return (
            <Redirect to='/' />
          )
        }

        return (
            <div className="Private" style={{marginTop: '200px'}}>
            <p> Sign out button for testing. </p> 
            <button onClick={this.signOut}> Sign out </button>
            </div>
        );
    }
}

export default Private;