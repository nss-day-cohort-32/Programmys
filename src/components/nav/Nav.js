import React, { Component } from 'react';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import './Nav.css';
import { Link } from 'react-router-dom';
import {
  Header, Image,
} from 'semantic-ui-react';

class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cohort: {},
    };
    this.db = firebase.firestore();
  }

  componentDidMount() {
    const { currentUser } = this.props;
    this.db.doc(`cohorts/${currentUser.cohortId}`).get()
      .then((snapshot) => {
        this.setState({ cohort: snapshot.data() });
      });
  }


  render() {
    const { cohort } = this.state;
    return (
      <>
        <div className="nav">
          <ul>
            <li>NSS</li>
            <li><Link to="/">Logout</Link></li>
            <li><Link to="/vote">Vote</Link></li>
            <li><Link to="/vote/addAward">Add Award</Link></li>
          </ul>
          <h1>The Programmys</h1>
          <div className="cohort_bar">

            <Header as="h2" className="cohort_bar">
              <Image circular src={cohort.icon} size="tiny" verticalAlign="bottom" />
              {cohort.name}
            </Header>

          </div>
        </div>
      </>

    );
  }
}

export default Nav;
