import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Dropdown, Button } from 'semantic-ui-react';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import { storeUser } from '../../modules/userManager';


class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cohortOptions: [],
      cohortId: null,
    };

    this.db = firebase.firestore();
    this.auth = firebase.auth();
    this.githubProvider = new firebase.auth.GithubAuthProvider();

    this.signIn = this.signIn.bind(this);
    this.builduser = this.builduser.bind(this);
  }

  componentDidMount() {
    this.db.collection('cohorts').get()
      .then((querySnapshot) => {
        const cohorts = querySnapshot.docs.map((doc) => {
          const cohort = doc.data();
          return {
            key: cohort.name,
            text: cohort.name,
            value: doc.id,
            image: { avatar: true, src: cohort.icon },
          };
        });
        this.setState({ cohortOptions: cohorts });
      });
  }

  builduser(githubData) {
    const defaults = { isStudent: true, isInstructor: false };
    const { cohortId } = this.state;
    const { displayName, email } = githubData.user;
    const { profile } = githubData.additionalUserInfo;

    return {
      ...defaults,
      cohortId,
      displayName,
      email,
      photoUrl: profile.avatar_url,
    };
  }

  signIn() {
    const { setCurrentUser } = this.props;
    let profileUser;

    this.auth.signInWithPopup(this.githubProvider)
      .then((githubCredentials) => {
        const { uid } = githubCredentials.user;
        const userRef = this.db.collection('users').doc(uid);
        profileUser = this.builduser(githubCredentials);
        return userRef.get();
      })
      .then((userSnapshot) => {
        if (userSnapshot.exists) return null;
        return userSnapshot.ref.set(profileUser);
      })
      .then(() => {
        const { history } = this.props;
        storeUser(profileUser);
        setCurrentUser(profileUser);
        history.push('vote/');
      });
  }

  render() {
    const { cohortOptions, cohortId } = this.state;
    return (
      <>
        <section className="auth_wrapper">
          <h2>Select Your Cohort</h2>
          <Dropdown
            onChange={(_evt, data) => { this.setState({ cohortId: data.value }); }}
            id="cohort-select"
            placeholder="Select Cohort"
            fluid
            selection
            options={cohortOptions}
          />
          <Button
            id="login-btn"
            disabled={!cohortId}
            color="pink"
            className="btn_margin"
            content="Sign in with GitHub"
            onClick={this.signIn}
          />
        </section>
      </>
    );
  }
}

export default withRouter(Login);
