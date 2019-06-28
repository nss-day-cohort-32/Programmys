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

  render() {
    const { currentUser } = this.state;
    return (
      <Router>
        <div className="App">
          <AppViews
            currentUser={currentUser}
            setCurrentUser={user => this.setState({ currentUser: user })}
          />
        </div>
      </Router>
    );
  }
}

export default App;
