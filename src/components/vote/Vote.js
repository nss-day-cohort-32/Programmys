import React from 'react';
import { Route } from 'react-router-dom';
import VoteList from './VoteList';
import CreateAward from './CreateAward';
import Nav from '../nav/Nav';

const Vote = ({ currentUser, setCurrentUser, updateCurrentUserVote }) => (
  <>
    <Nav
      currentUser={currentUser}
      setCurrentUser={setCurrentUser}
    />
    <Route
      path="/vote/addAward"
      render={props => <CreateAward currentUser={currentUser} {...props} />
      }
    />
    <Route
      exact
      path="/vote/"
      render={props => (
        <VoteList
          currentUser={currentUser}
          updateCurrentUserVote={updateCurrentUserVote}
          {...props}
        />
      )
      }
    />

  </>
);

export default Vote;
