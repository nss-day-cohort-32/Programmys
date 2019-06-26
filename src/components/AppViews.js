import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import Auth from './auth/Auth';
import Vote from './vote/Vote';
import AdminViews from './admin/AdminViews';

/* eslint-disable */
class AppViews extends Component {

  render() {
    const { setCurrentUser } = this.props;

    return (
      <React.Fragment>
        <Route exact path="/" render={(props) => {
          return <Auth {...props} setCurrentUser={setCurrentUser} />
        }} />
        <Route path="/vote/" render={(props) => {
          return <Vote currentUser={this.props.currentUser} {...props} />
        }} />
        <Route path="/admin" render={(props) => {
          return <AdminViews {...props} />
        }} />
      </React.Fragment>
    )
  }
}

export default withRouter(AppViews)