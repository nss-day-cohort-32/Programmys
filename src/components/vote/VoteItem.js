import * as firebase from 'firebase/app';
import React, { Component } from 'react';
import {
  Button, Card, Image, Dropdown,
} from 'semantic-ui-react';
import awardIcon from '../../images/grammys.png';
import 'firebase/firestore';
import './Vote.css';


class VoteItem extends Component {
  constructor(props) {
    super(props);
    this.state = { voters: [], notes: '' };
    this.db = firebase.firestore();
    this.setDropdownData = this.setDropdownData.bind(this);
    this.handleFieldChange = this.handleFieldChange.bind(this);
  }

  componentDidMount() {
    this.db.collection('users').get()
      .then((querySnapshot) => {
        const voters = querySnapshot.docs.map(doc => ({
          ...doc.data(),
          id: doc.id,
        }));
        this.setState({ voters });
      });
  }

  setDropdownData(_evt, userDropdownData) {
    this.setState({ userDropdownData });
  }

  handleFieldChange(evt) {
    this.setState({ notes: evt.target.value });
  }


  buildAndSubmitVote(awardId) {
    const { submitVote, currentUser } = this.props;
    const { userDropdownData, notes } = this.state;
    const voteObject = {
      nomineeId: userDropdownData.value,
      voterId: currentUser.id,
      notes,
    };
    submitVote(awardId, voteObject);
  }


  render() {
    const { award } = this.props;
    const { voters } = this.state;
    const options = voters.map((voter) => {
      const option = {};
      option.key = voter.id;
      option.text = voter.displayName;
      option.value = voter.id;
      option.image = { avatar: true, src: voter.photoUrl };
      return option;
    });

    return (

      <Card className="centered">
        <Card.Content>
          <Image floated="right" size="mini" src={awardIcon} />
          <Card.Header>{award.name}</Card.Header>
          <Card.Meta>
            created by:
            {' '}
            {award.createdBy}
          </Card.Meta>
          <Card.Description>
            {award.description}
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <div className="mrgn_bt">

            <Dropdown
              key={award.id}
              onChange={this.setDropdownData}
              placeholder="Select Recipient"
              fluid
              selection
              options={options}
            />

          </div>
          <div className="ui input fluid mrgn_bt"><input onChange={this.handleFieldChange} type="text" placeholder="tell us why..." /></div>
          <div>
            <Button onClick={() => this.buildAndSubmitVote(award.id)} className="ui fluid button positive">
              Vote
            </Button>
          </div>
        </Card.Content>
      </Card>

    );
  }
}

export default VoteItem;
