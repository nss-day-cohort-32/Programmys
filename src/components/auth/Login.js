import React, { Component } from 'react';
import { Dropdown, Button } from 'semantic-ui-react';
import * as firebase from 'firebase/app';
import 'firebase/firestore';


class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cohortOptions: [],
      cohortId: null,
    };
  }

  componentDidMount() {
    const db = firebase.firestore();
    db.collection('cohorts').get()
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
          <Button id="login-btn" className="pink btn_margin">Sign in with GitHub</Button>
          <p>{cohortId}</p>
        </section>
      </>
    );
  }
}

export default Login;
