import React from 'react';
import Login from './Login';


const Auth = ({ setCurrentUser }) => (
  <>
    <div className="auth_wrapper">
      <div className="center_content">
        <h1 className="programmys_logo">the ProGrammys</h1>
        <Login setCurrentUser={setCurrentUser} />
      </div>
    </div>
  </>
);


export default Auth;
