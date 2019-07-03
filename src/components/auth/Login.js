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
      needsProfileInfo: false,
    };

    this.db = firebase.firestore();
    this.auth = firebase.auth();
    this.githubProvider = new firebase.auth.GithubAuthProvider();
    this.githubCredentials = null;

    this.signIn = this.signIn.bind(this);
    this.builduser = this.builduser.bind(this);
    this.createUser = this.createUser.bind(this);
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
    const { setCurrentUser, history } = this.props;
    let profileUser;

    this.auth.signInWithPopup(this.githubProvider)
      .then((credentials) => {
        this.githubCredentials = credentials;
        const { uid } = credentials.user;
        const userRef = this.db.collection('users').doc(uid);
        return userRef.get();
      })
      .then((userSnapshot) => {
        if (!userSnapshot.exists) {
          this.setState({ needsProfileInfo: true });
          return;
        }

        profileUser = userSnapshot.data();
        profileUser.id = userSnapshot.id;
        storeUser(profileUser);
        setCurrentUser(profileUser);
        history.push('vote/');
      });
  }

  createUser() {
    const { setCurrentUser, history } = this.props;
    const profileUser = this.builduser(this.githubCredentials);
    const userRef = this.db
      .collection('users')
      .doc(this.githubCredentials.user.uid);

    userRef.set(profileUser)
      .then(() => {
        storeUser(profileUser);
        setCurrentUser(profileUser);
        history.push('vote/');
      });
  }

  render() {
    const { cohortOptions, cohortId, needsProfileInfo } = this.state;
    return (
      <>
        <section className="auth_select">
          {
            needsProfileInfo ? (
              <Dropdown
                onChange={(_evt, data) => { this.setState({ cohortId: data.value }); }}
                id="cohort-select"
                placeholder="Select Cohort"
                fluid
                selection
                options={cohortOptions}
              />
            ) : null
          }
          {
            !needsProfileInfo
              ? (
                <Button
                  id="login-btn"
                  color="pink"
                  className="btn_margin"
                  content="Sign in with GitHub"
                  onClick={this.signIn}
                />
              )
              : (
                <Button
                  id="create-account-btn"
                  color="green"
                  className="btn_margin"
                  content="Begin Voting"
                  disabled={!cohortId}
                  onClick={this.createUser}
                />
              )

          }
        </section>
      </>
    );
  }
}

export default withRouter(Login);
