import React, { Component } from 'react';
import { Button, Card, Image } from 'semantic-ui-react';
import DropdownExampleSelection from './Dropdown';


/* eslint-disable */
class VoteItem extends Component {
  render() {
    const { award } = this.props;
    return (

      <Card className="centered">
        <Card.Content>
          <Image floated='right' size='mini' src='/images/avatar/large/steve.jpg' />
          <Card.Header>{award.name}</Card.Header>
          <Card.Meta>{award.createdBy}</Card.Meta>
          <Card.Description>
            {award.description}
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <div className='ui two buttons'>
            <Button basic color='green'>
              Approve
          </Button>
            <Button basic color='red'>
              Decline
          </Button>
          </div>
          <div>
            <DropdownExampleSelection />
          </div>
        </Card.Content>
      </Card>

    );
  }
}

export default VoteItem;