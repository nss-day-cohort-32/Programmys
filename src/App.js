import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import './App.css';
import AppViews from './components/AppViews';


function App() {
  return (
    <Router>
      <div className="App">
        <AppViews />
      </div>
    </Router>
  );
}

export default App;
