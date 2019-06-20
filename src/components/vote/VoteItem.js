import * as firebase from 'firebase/app';
import React, { Component } from 'react';
import { Button, Card, Image } from 'semantic-ui-react';
import DropdownExampleSelection from './Dropdown';
import awardIcon from '../../images/grammys.png';
import 'firebase/firestore';
import './Vote.css';


class VoteItem extends Component {
  constructor(props) {
    super(props);
    this.state = { voters: [] };
    this.db = firebase.firestore();
  }

  componentDidMount() {
    const db = firebase.firestore();
    db.collection('users').get()
      .then((querySnapshot) => {
        const voters = querySnapshot.docs.map(doc => ({
          ...doc.data(),
          id: doc.id,
        }));
        this.setState({ voters });
      });
  }

  render() {
    const { award } = this.props;
    const { voters } = this.state;
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
            <DropdownExampleSelection key={award.id} voters={voters} />
          </div>
          <div>
            <Button className="ui fluid button positive">
              Vote
            </Button>
          </div>
        </Card.Content>
      </Card>

    );
  }
}

export default VoteItem;
