import React, { Component } from 'react';
import VoteList from './VoteList';
import CreateCategory from './CreateCategory';
import ButtonExampleButton from '../../Btn';
import DropdownExampleSelection from './Dropdown';

/* eslint-disable */
class Vote extends Component {
  render() {
    return (
      <>
        <CreateCategory />
        <VoteList />
        <DropdownExampleSelection />
        <ButtonExampleButton />
        {/* eslint-disable-next-line */}
        <button className="ui button" role="button">Btn with Semantic-UI</button>
      </>
    );
  }
}

export default Vote;