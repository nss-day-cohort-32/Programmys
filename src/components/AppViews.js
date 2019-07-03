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
    <Route
      path="/admin"
      render={props => <AdminViews {...props} />}
    />
  </React.Fragment>
);


export default withRouter(AppViews);
