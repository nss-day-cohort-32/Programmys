import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import CohortAdd from './CohortAdd';

const AdminViews = () => (
  <>
    <Route
      exact
      path="/admin"
      render={() => <Redirect to="/admin/cohorts/new" />}
    />
    <Route
      exact
      path="/admin/cohorts/new"
      component={CohortAdd}
    />
  </>
);

export default AdminViews;
