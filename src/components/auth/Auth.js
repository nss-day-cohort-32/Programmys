import React, { Component } from 'react'
import Login from './Login'
import Register from './Register'
import {Link} from 'react-router-dom'


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