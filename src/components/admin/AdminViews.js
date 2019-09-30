import React from 'react';
import { Link, Route } from 'react-router-dom';
import Admin from './Admin';
import CohortAdd from './CohortAdd';
import CohortView from './CohortView';

const AdminViews = () => (

  <>
    <nav>
      <h1>ADMIN</h1>
      <Link to="/admin/cohorts/new">Add Cohort</Link>
      <Link to="/admin/cohorts/view">View Cohorts</Link>
    </nav>
    <Route
      exact
      path="/admin"
      component={Admin}
    />
    <Route
      exact
      path="/admin/cohorts/new"
      component={CohortAdd}
    />
    <Route
      exact
      path="/admin/cohorts/view"
      component={CohortView}
    />
  </>
);

export default AdminViews;
