import React, { Component } from 'react';
import VoteList from './VoteList';
import CreateCategory from './CreateCategory';

/* eslint-disable */
class Vote extends Component {
  render() {
    return (
      <>
        <CreateCategory />
        <VoteList />
      </>
    );
  }
}

export default Vote;