import * as firebase from 'firebase/app';
import React, { Component } from 'react';
import VoteItem from './VoteItem';
import 'firebase/firestore';

class VoteList extends Component {
  constructor(props) {
    super(props);
    this.state = { awards: [] };
    this.db = firebase.firestore();
    this.submitVote = this.submitVote.bind(this);
  }


  componentDidMount() {
    const { currentUser } = this.props;
    this.db.collection(`cohorts/${currentUser.cohortId}/awards`).get()
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
    return awards.filter((award) => {
      const { currentUser } = this.props;
      return !currentUser.votes
        || !currentUser.votes.find(userVoted => userVoted === award.id);
    });
  }

  getVotedAwards() {
    const { awards } = this.state;
    return awards.filter((award) => {
      const { currentUser } = this.props;
      return currentUser.votes.find(userVoted => userVoted === award.id);
    });
  }

  submitVote(awardId, voteObject) {
    const { currentUser, updateCurrentUserVote } = this.props;
    this.db.collection(`cohorts/${currentUser.cohortId}/awards/${awardId}/votes`).doc().set(voteObject);
    updateCurrentUserVote(awardId);
  }

  render() {
    const unvotedAwards = this.getUnvotedAwards();
    // const votedAwards = this.getVotedAwards();
    const { currentUser } = this.props;

    return (
      <>
        <h1>Awards</h1>
        {unvotedAwards.map(award => (
          <VoteItem
            key={award.id}
            award={award}
            submitVote={this.submitVote}
            currentUser={currentUser}
          />
        ))}
        {/* <h2>Vote history</h2>
        {votedAwards.map(award => (
          <VoteItem
            key={award.id}
            award={award}
            submitVote={this.submitVote}
            currentUser={currentUser}
          />
        ))} */}
      </>
    );
  }
}

export default VoteList;
