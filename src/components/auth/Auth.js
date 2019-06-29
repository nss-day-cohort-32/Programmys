import React, { Component } from 'react';
// import { Link } from 'react-router-dom';

import Login from './Login';

/* eslint-disable */
class Auth extends Component {
  render() {
    const { setCurrentUser } = this.props;
    return (
      <>
        <Login setCurrentUser={setCurrentUser} />
        {/* <Link to="vote/">Vote Now</Link> */}
      </>
    );
  }
}

export default Auth;