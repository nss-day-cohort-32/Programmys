import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import * as firebase from 'firebase/app';
import 'firebase/firestore';


class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.db = firebase.firestore();
  }


  render() {
    return (

      <h1>Admin Default Page text here</h1>

    );
  }
}

export default withRouter(Admin);
