import React from 'react';
import './App.css';
import AppViews from './components/AppViews'
import { BrowserRouter as Router } from "react-router-dom"


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
