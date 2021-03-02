import React, { Component } from 'react';
import '../../css/EmailVerification.css';
import { Link } from 'react-router-dom';

class EmailVerification extends Component {
    render() {
        return (
            <div className='email-verification'>
                <h1 id='emailv-header'>Email Verification</h1>
                <h2>Please check you email and verify your account before continuing.</h2>
                
                <p>Already verified? <Link to="/login">Log in</Link></p> 
            </div>
        );
    }
}

export default EmailVerification;