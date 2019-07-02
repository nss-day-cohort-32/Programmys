import React, { Component } from 'react';
// import { Link } from 'react-router-dom';

import Login from './Login';


/* eslint-disable */
class Auth extends Component {
  render() {
    const { setCurrentUser } = this.props;
    return (
      <>
        <div className="auth_wrapper">
          <div className="center_content">
            <h1 className="programmys_logo">the ProGrammys</h1>
            <Login setCurrentUser={setCurrentUser} />
            {/* <Link to="vote/">Vote Now</Link> */}
          </div>
        </div>
      </>
    );
  }
}

export default Auth;