import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import './App.css';
import AppViews from './components/AppViews';
import Nav from './components/nav/Nav';


function App() {
  return (
    <Router>
      <div className="App">
        <Nav />
        <AppViews />
      </div>
    </Router>
  );
}

export default App;
