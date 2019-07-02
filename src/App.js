import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import 'firebase/auth';
import 'firebase/firestore';
import { getUser, storeUser } from './modules/userManager';
import AppViews from './components/AppViews';
import './App.css';
import nsslogo from './images/nss-logo-horizontal.jpg';

class App extends Component {
  constructor() {
    super();
    this.state = {
      currentUser: getUser(),
    };
    this.updateCurrentUserVote = this.updateCurrentUserVote.bind(this);
  }

  updateCurrentUserVote(awardId) {
    const { currentUser } = this.state;
    const newUserState = { ...currentUser };
    if (newUserState.votes) {
      newUserState.votes.push(awardId);
    } else { newUserState.votes = [awardId]; }
    this.setState({ currentUser: newUserState });
    storeUser(newUserState);
  }

  render() {
    const { currentUser } = this.state;
    return (
      <Router>
        <div>
          <div className="logo_wrapper">
            <img src={nsslogo} className="nss_logo" alt="Nashville Software School" />
          </div>
          <AppViews
            currentUser={currentUser}
            setCurrentUser={user => this.setState({ currentUser: user })}
            updateCurrentUserVote={this.updateCurrentUserVote}
          />
        </div>
      </Router>
    );
  }
}

export default App;
