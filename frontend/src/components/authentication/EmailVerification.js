import React, { Component } from 'react';
import '../../css/EmailVerification.css';
import { Link } from 'react-router-dom';
import fire from '../../fire.js';

class EmailVerification extends Component { 

    firebase_token_check = () => {
        fire.auth().signInWithEmailAndPassword('aaparmar@calpoly.edu', 'Pa55w0rd1').then(currentUser => {
            const idToken = fire.auth().currentUser.getIdToken();
            console.log(idToken);
        })
    }


    render() {
        return (
            <div className='email-verification'>
                <h1 id='emailv-header'>Email Verification</h1>
                <h2>Please check you email and verify your account before continuing.</h2>
                
                <p>Already verified? <Link to="/login">Log in</Link></p> 

                <button onClick={this.firebase_token_check}> check token id </button>
            </div>
        );
    }
}

export default EmailVerification;