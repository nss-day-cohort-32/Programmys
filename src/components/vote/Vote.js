import React, { Component } from 'react';
import VoteList from './VoteList';
import CreateAward from './CreateAward';

/* eslint-disable */
class Vote extends Component {
  render() {
    return (
      <>
        <CreateAward />
        <VoteList />
      </>
    );
  }
}

export default Vote;