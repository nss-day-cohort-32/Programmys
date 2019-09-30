import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {
  Container,
} from 'semantic-ui-react';
import * as firebase from 'firebase/app';
import 'firebase/firestore';


class CohortView extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.db = firebase.firestore();
  }


  render() {
    return (
      <Container>
        <h1>Cohort View</h1>
      </Container>
    );
  }
}

export default withRouter(CohortView);
