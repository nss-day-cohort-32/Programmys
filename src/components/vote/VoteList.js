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

  getUnvotedAwards() {
    const { awards } = this.state;
    console.log('AWARDS', awards);
    return awards.filter((award) => {
      const { currentUser } = this.props;
      return !currentUser.votes
        || !currentUser.votes.find(userVoted => userVoted === award.id);
    });
  }

  render() {
    //
    const unvotedAwards = this.getUnvotedAwards();
    return (
      <>
        <h1>Awards</h1>
        {unvotedAwards.map(award => <VoteItem key={award.id} award={award} />)}
      </>
    );
  }
}

export default VoteList;
