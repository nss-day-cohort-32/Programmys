import React, { Component } from 'react'
import VoteItem from './VoteItem'


class VoteList extends Component {
    render() {
        return (
            <>
            <h2>Show The Vote Items List</h2>
            <VoteItem />
            </>
        );
    }
}

export default VoteList;