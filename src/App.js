import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Btn from './Btn';

import './App.css';
import AppViews from './components/AppViews';


function App() {
  return (
    <Router>
      <div className="App">
        <AppViews />
        <Btn />
        <button className="ui button pink" type="button">Click Here</button>
      </div>
    </Router>
  );
}

export default App;
