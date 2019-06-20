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

    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        this.setState({
          currentUser: null,
          userLoaded: true,
        });
      }

      this.db.collection('users')
        .doc(user.uid)
        .get()
        .then((userSnapshot) => {
          this.setState({
            currentUser: userSnapshot.data(),
            userLoaded: true,
          });
        });

      /*
        NOTE 1: As far as I can tell, there is no way to add
        additional info onto the user object that firebase
        stores locally. It stores things like email, displayName,
        and photoUrl; but I can't get it to save other profile info
        like cohortId and isInstructor along with it so I've considered
        two options.

          PLAN 1: As auth state changes, if it's detected that a user
          has just logged in, then grab their profile data from the users
          collection. This is the current implementation. The downside, is
          a noticeable load time when the user first comes to the page.
          See NOTE 2 below for more details on why this is.

          PLAN 2: Well, there used to be something here but it wasn't good.
          Stick with PLAN 1 for now.

        NOTE 2: Using the userLoaded flag is definitely weird.
        Using a Higher-Order component would be better
        and even w/o one, maybe there is a better way to
        handle this. But my feeling is that we can't safely
        render _most_ components inside AppViews (or anywhere)
        without knowledge of the authState and profile info.
        If there's time, it'd be nice to implement something like
        I found in the following blog post; specifically the section
        where he implements the withAuthorization higher-order component
        https://www.robinwieruch.de/complete-firebase-authentication-react-tutorial/
      */
    });
  }

  render() {
    const { currentUser, userLoaded } = this.state;
    return (
      <Router>
        <div className="App">
          {
            userLoaded ? (
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
