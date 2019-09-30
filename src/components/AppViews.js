import React from 'react';
import { Route, withRouter, Redirect } from 'react-router-dom';
import Auth from './auth/Auth';
import Vote from './vote/Vote';
import AdminViews from './admin/AdminViews';

const AppViews = ({ currentUser, setCurrentUser, updateCurrentUserVote }) => (

  <React.Fragment>
    <Route
      exact
      path="/"
      render={props => (!currentUser ? (
        <Auth {...props} setCurrentUser={setCurrentUser} />
      ) : (
        <Redirect to="/vote" />
      ))}
    />
    <Route
      path="/vote/"
      render={props => (currentUser ? (
        <Vote
          currentUser={currentUser}
          {...props}
          setCurrentUser={setCurrentUser}
          updateCurrentUserVote={updateCurrentUserVote}
        />
      ) : (
        <Redirect to="/" />
      ))}
    />
    {/* create a 404 component to redirect to below */}
    <Route
      path="/admin"
      render={props => (currentUser.isInstructor
        ? <AdminViews {...props} /> : <Redirect to="/" />)}
    />
  </React.Fragment>
);


export default withRouter(AppViews);
