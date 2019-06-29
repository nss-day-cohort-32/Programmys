import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import 'firebase/auth';
import 'firebase/firestore';
import { getUser } from './modules/userManager';
import AppViews from './components/AppViews';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      currentUser: getUser(),
    };
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
    const { currentUser } = this.state;
    return (
      <Router>
        <div className="App">
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
