import React, { Component } from 'react';
import './Nav.css';
import { Link } from 'react-router-dom';

class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <>
        <div className="nav">
          <ul>
            <li>NSS</li>
            <li><Link to="/">Logout</Link></li>
            <li><Link to="/vote">Vote</Link></li>
          </ul>
          <h1>The Programmys</h1>
          <div className="cohort_bar">
            <h2>Cohort 32</h2>
          </div>
        </div>
      </>

    );
  }
}

export default Nav;
