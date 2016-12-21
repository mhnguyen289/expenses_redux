import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';
import { Router, Route, hashHistory, Redirect } from 'react-router';
import App from './App';
import Dashboard from './Dashboard';
import Calculator from './Calculator';
import DatePickerExample from './DatePickerExample';

const Root = ({ store }) => (
  <Provider store={store} >
    <Router history={hashHistory}>
      <Route path="/" component={App}>
        <Redirect from="/logout" to="/" />
        <Redirect from="/demo" to="/dashboard" />
        <Route path="/calculator" component={Calculator} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/example" component={DatePickerExample} />
      </Route>
    </Router>
  </Provider>
);

Root.propTypes = {
  store: PropTypes.object.isRequired,
};

export default Root;
