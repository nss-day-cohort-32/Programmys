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

/* eslint-disable */
class CreateCategory extends Component {
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
    const { history } = this.props;
    const {
      name,
      description,
    } = this.state;

    const id = Date.now().toString()
    const createdAt = Date.now()
    const votingEndDate = Date.now() + 10
    // update below with user from session
    const createdBy = "Bryan Nilsen"
    const createdById = "sfS8grOXQviDhLdttxNC"
    // where are votes recorded?
    const payload = {
      name,
      description,
      createdAt,
      createdBy,
      createdById,
      votingEndDate,
    };

    // cohort Id to be set dynamically based on user cohort
    const cohort = "D32"

    this.db.collection(`cohorts/${cohort}/awards`).doc(id)
      .set(payload)
      .then(() => history.push('/'));
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

export default withRouter(CreateCategory);
