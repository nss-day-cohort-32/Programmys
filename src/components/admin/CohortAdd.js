import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {
  Form,
  Dropdown,
  Container,
  Grid,
  GridRow,
  GridColumn,
  Header,
  Button,
} from 'semantic-ui-react';
import * as firebase from 'firebase/app';
import 'firebase/firestore';

const programOptions = [
  {
    key: 'day',
    text: 'Day',
    value: 'D',
  },
  {
    key: 'evening',
    text: 'Evening',
    value: 'E',
  },
];

class CohortAdd extends Component {
  constructor(props) {
    super(props);
    this.state = { program: 'D' };
    this.db = firebase.firestore();

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleProgramChange = this.handleProgramChange.bind(this);
    this.submit = this.submit.bind(this);
  }

  handleInputChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  }

  handleProgramChange(_e, { value }) {
    this.setState({ program: value });
  }

  submit() {
    const { history } = this.props;
    const {
      program,
      cohortNumber,
      slackChannel,
      icon,
    } = this.state;

    const id = program + cohortNumber;
    const dayOrEvening = program === 'D' ? 'Day' : 'Evening';
    const name = `${dayOrEvening} Cohort ${cohortNumber}`;
    // remove any # signs from slack channel
    const payload = {
      icon,
      name,
      slackChannel: slackChannel.replace(/#/g, ''),
    };

    this.db.collection('cohorts').doc(id)
      .set(payload)
      .then(() => history.push('/'));
  }

  render() {
    const { program } = this.state;
    return (
      <Container>
        <Header
          as="h1"
          textAlign="center"
          content="Add Cohort"
        />
        <Grid>
          <GridRow centered>
            <GridColumn
              largeScreen={10}
              computer={10}
              tablet={14}
              mobile={16}
            >
              <Form onSubmit={this.submit}>
                <Form.Group widths="equal">
                  <Form.Field
                    name="program"
                    label="Program"
                    control={() => (
                      <Dropdown
                        placeholder="Select"
                        fluid
                        selection
                        onChange={this.handleProgramChange}
                        value={program}
                        options={programOptions}
                      />
                    )}
                  />
                  <Form.Field
                    name="cohortNumber"
                    control="input"
                    type="number"
                    placeholder="32"
                    onChange={this.handleInputChange}
                    label="Cohort Number"
                  />
                  <Form.Field
                    name="slackChannel"
                    control="input"
                    placeholder="day-cohort-32"
                    onChange={this.handleInputChange}
                    label="Slack Channel"
                  />
                </Form.Group>
                <Form.Field
                  name="icon"
                  control="input"
                  placeholder="https://avatars2.githubusercontent.com/..."
                  onChange={this.handleInputChange}
                  label="Github Image URL"
                />
                <Button
                  type="submit"
                  content="Submit"
                  color="orange"
                />
              </Form>
            </GridColumn>
          </GridRow>
        </Grid>
      </Container>
    );
  }
}

export default withRouter(CohortAdd);
