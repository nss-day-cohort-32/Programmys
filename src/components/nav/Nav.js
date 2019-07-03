import React, { Component } from 'react';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import './Nav.css';
import { Link } from 'react-router-dom';
import {
  Header, Image,
} from 'semantic-ui-react';
import { removeUser } from '../../modules/userManager';

class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cohort: {},
    };
    this.db = firebase.firestore();

    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    const { currentUser } = this.props;
    this.db.doc(`cohorts/${currentUser.cohortId}`).get()
      .then((snapshot) => {
        this.setState({ cohort: snapshot.data() });
      });
  }

  logout() {
    const { setCurrentUser } = this.props;
    setCurrentUser(null);
    removeUser();
  }


  render() {
    const { cohort } = this.state;
    return (
      <>
        <div className="nav">
          <ul>
            <li><Link to="/" onClick={this.logout}>Logout</Link></li>
            <li><Link to="/vote">Vote</Link></li>
            <li><Link to="/vote/addAward">Add Award</Link></li>
          </ul>
          <h1 className="programmys_logo">the ProGrammys</h1>
          <div className="cohort_bar">
            <div className="center_content">
              <Header as="h2" className="cohort_font">
                <Image circular src={cohort.icon} size="tiny" verticalAlign="bottom" />
                {cohort.name}
              </Header>
            </div>
          </div>
        </div>
      </>

    );
  }
}

export default Nav;
