import React, { Component } from 'react'
import {Link} from 'react-router-dom'

import Login from './Login'
import Register from './Register'

/* eslint-disable */
class Auth extends Component {
    render() {
        return (
            <>
                <Login />
                <Register />
                <Link to="vote/">Vote Now</Link>
            </>
        );
    }
}

export default Auth;