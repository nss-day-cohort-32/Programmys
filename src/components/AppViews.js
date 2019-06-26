import React, { Component } from 'react';
import { Route, withRouter, Redirect } from 'react-router-dom';
import Auth from './auth/Auth';
import Vote from './vote/Vote';
import AdminViews from './admin/AdminViews';

/* eslint-disable */
class AppViews extends Component {

  render() {
    const { setCurrentUser, currentUser } = this.props;

    return (
      <React.Fragment>
        <Route exact path="/" render={(props) => {
          return !currentUser ? (
            <Auth {...props} setCurrentUser={setCurrentUser} />
          ) : (
              <Redirect to="/vote" />
            )
        }} />
        <Route path="/vote/" render={(props) => {
          return currentUser ? (
            <Vote
              currentUser={currentUser} {...props}
              setCurrentUser={setCurrentUser}
            />
          ) : (
              <Redirect to="/" />
            )
        }} />
        <Route path="/admin" render={(props) => {
          return <AdminViews {...props} />
        }} />
      </React.Fragment>
    )
  }
}

export default withRouter(AppViews)