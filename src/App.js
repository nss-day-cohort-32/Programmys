import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

import './App.css';
import AppViews from './components/AppViews';


class App extends Component {
  constructor() {
    super();
    this.state = {
      currentUser: null,
      userLoaded: false,
    };

    this.db = firebase.firestore();
    this.updateCurrentUserVote = this.updateCurrentUserVote.bind(this);

    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        this.setState({
          currentUser: null,
          userLoaded: true,
        });
        return;
      }
      this.db.collection('users')
        .doc(user.uid)
        .get()
        .then((userSnapshot) => {
          const userData = userSnapshot.data();
          userData.id = userSnapshot.id;
          this.setState({
            currentUser: userData,
            userLoaded: true,
          });
        });
    });
  }

  updateCurrentUserVote(awardId) {
    const { currentUser } = this.state;
    const newUserState = { ...currentUser };
    if (newUserState.votes) {
      newUserState.votes.push(awardId);
    } else { newUserState.votes = [awardId]; }
    this.setState({ currentUser: newUserState });
  }

  render() {
    const { currentUser, userLoaded } = this.state;
    return (
      <Router>
        <div className="App">
          {userLoaded ? (
            <>
              <AppViews
                currentUser={currentUser}
                updateCurrentUserVote={this.updateCurrentUserVote}
              />
            </>
          ) : null
          }
        </div>
      </Router>
    );
  }
}

export default App;
