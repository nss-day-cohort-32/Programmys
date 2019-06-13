import React, { Component } from 'react';
import VoteList from './VoteList';
import CreateCategory from './CreateCategory';
import DropdownExampleSelection from './Dropdown';

/* eslint-disable */
class Vote extends Component {
  render() {
    return (
      <>
        <CreateCategory />
        <VoteList />
        <DropdownExampleSelection />
      </>
    );
  }
}

export default Vote;