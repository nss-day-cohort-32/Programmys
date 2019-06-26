import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import {
  Form,
  Container,
  Grid,
  GridRow,
  GridColumn,
  Header,
  Button,
} from 'semantic-ui-react';
import * as firebase from 'firebase/app';
import 'firebase/firestore';

class CreateAward extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.db = firebase.firestore();

    this.handleInputChange = this.handleInputChange.bind(this);
    this.submit = this.submit.bind(this);
  }

  handleInputChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  }

  submit() {
    const { history, currentUser } = this.props;
    const {
      name,
      description,
    } = this.state;

    function addDaysToDate(date, days) {
      const result = new Date(date);
      result.setDate(result.getDate() + days);
      return result;
    }

    const date = new Date();
    const fDate = addDaysToDate(date, 10);
    const timestamp = firebase.firestore.Timestamp.fromDate(date);
    const futureDate = firebase.firestore.Timestamp.fromDate(fDate);

    const createdAt = timestamp;
    const votingEndDate = futureDate;
    const createdBy = currentUser.displayName;
    const createdById = currentUser.id;

    const payload = {
      name,
      description,
      createdAt,
      createdBy,
      createdById,
      votingEndDate,
    };

    const cohort = currentUser.cohortId;

    this.db.collection(`cohorts/${cohort}/awards`).doc()
      .set(payload)
      .then(() => history.push('/vote'));
  }

  render() {
    return (
      <Container>
        <Header
          as="h1"
          textAlign="center"
          content="Add Award"
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
                    name="name"
                    control="input"
                    placeholder="award name"
                    onChange={this.handleInputChange}
                    label="Award Name"
                  />
                  <Form.Field
                    name="description"
                    control="input"
                    placeholder="award description"
                    onChange={this.handleInputChange}
                    label="Description"
                  />
                </Form.Group>
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

export default withRouter(CreateAward);
