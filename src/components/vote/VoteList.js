import * as firebase from 'firebase/app';
import React, { Component } from 'react';
import VoteItem from './VoteItem';
import 'firebase/firestore';

class VoteList extends Component {
  constructor(props) {
    super(props);
    this.state = { awards: [] };
    this.db = firebase.firestore();
  }

  componentDidMount() {
    const db = firebase.firestore();
    db.collection('cohorts/D32/awards').get()
      .then((querySnapshot) => {
        const awards = querySnapshot.docs.map(doc => ({
          ...doc.data(),
          id: doc.id,
        }));
        this.setState({ awards });
      });
  }


  render() {
    const { awards } = this.state;
    return (
      <>
        <h2>Show The Vote Items List</h2>
        {awards.map(award => <VoteItem key={award.id} award={award} />)}
      </>
    );
  }
}

export default VoteList;
