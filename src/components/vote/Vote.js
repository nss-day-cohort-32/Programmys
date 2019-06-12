import React, { Component } from 'react'
import VoteList from './VoteList'
import CreateCategory from './CreateCategory'


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