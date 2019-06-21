import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

import './App.css';
import AppViews from './components/AppViews';
import Nav from './components/nav/Nav';


class App extends Component {
  constructor() {
    super();
    this.state = {
      currentUser: null,
      userLoaded: false,
    };

    this.db = firebase.firestore();

    // quick explanation what's happening here
    // how does firebase.auth know state has changed?
    firebase.auth().onAuthStateChanged((user) => {
      // how is userLoaded true if no user?
      if (!user) {
        this.setState({
          currentUser: null,
          userLoaded: true,
        });
      }

      // this always runs regardless if no user, and sets state?
      this.db.collection('users')
        .doc(user.uid)
        .get()
        .then((userSnapshot) => {
          this.setState({
            currentUser: userSnapshot.data(),
            userLoaded: true,
          });
        });
    });
  }

  render() {
    const { currentUser, userLoaded } = this.state;
    return (
      <Router>
        <div className="App">
          {userLoaded ? (
            <>
              <Nav currentUser={currentUser} />
              <AppViews currentUser={currentUser} />
            </>
          ) : null
          }
        </div>
      </Router>
    );
  }
}

export default App;
